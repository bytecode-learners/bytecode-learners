import fs from 'fs/promises';
import path from 'path';

const README_PATH = path.join(process.cwd(), 'README.md');
const CONTENT_DIR = path.join(process.cwd(), 'content');

async function updateReadme() {
  try {
    let readme = await fs.readFile(README_PATH, 'utf-8');

    // 1. Update Stats
    try {
      const statsPath = path.join(CONTENT_DIR, 'stats', 'index.json');
      const statsData = JSON.parse(await fs.readFile(statsPath, 'utf-8'));
      
      const statsContent = `
<div align="center">
  <table width="100%">
    <tr>
      <td align="center">
        <h3>💻 Lines Committed</h3>
        <h2>${statsData.lines_committed || 0}</h2>
      </td>
      <td align="center">
        <h3>👨‍💻 Active Learners</h3>
        <h2>${statsData.active_learners || 0}</h2>
      </td>
      <td align="center">
        <h3>🔴 Live Events</h3>
        <h2>${statsData.live_events || 0}</h2>
      </td>
      <td align="center">
        <h3>🏆 Kernel Achievements</h3>
        <h2>${statsData.kernel_achievements || 0}</h2>
      </td>
    </tr>
  </table>
</div>
`;
      
      readme = replaceBetween(readme, '<!-- tina-stats-start -->', '<!-- tina-stats-end -->', statsContent);
    } catch (e) {
      console.log('Could not process stats:', e.message);
    }

    // 2. Update Events
    try {
      const eventsDir = path.join(CONTENT_DIR, 'events');
      const eventFiles = (await fs.readdir(eventsDir)).filter(f => f.endsWith('.json'));
      
      let eventsContent = '<table width="100%">\n  <tr>\n    <th align="left">Event</th>\n    <th align="left">Date</th>\n    <th align="left">Location</th>\n    <th align="left">Tag</th>\n  </tr>\n';
      
      for (const file of eventFiles) {
        const eventData = JSON.parse(await fs.readFile(path.join(eventsDir, file), 'utf-8'));
        eventsContent += `  <tr>\n    <td><b>${eventData.title}</b></td>\n    <td>${eventData.date}</td>\n    <td>${eventData.location || 'TBA'}</td>\n    <td><code>${eventData.tag || '-'}</code></td>\n  </tr>\n`;
      }
      eventsContent += '</table>\n';
      
      readme = replaceBetween(readme, '<!-- tina-events-start -->', '<!-- tina-events-end -->', eventsContent);
    } catch (e) {
      console.log('Could not process events:', e.message);
    }

    // 3. Update Projects
    try {
      const projectsDir = path.join(CONTENT_DIR, 'projects');
      const projectFiles = (await fs.readdir(projectsDir)).filter(f => f.endsWith('.json'));
      
      let projectsContent = '\n';
      
      for (const file of projectFiles) {
        const proj = JSON.parse(await fs.readFile(path.join(projectsDir, file), 'utf-8'));
        projectsContent += `### [${proj.title}](${proj.repo})\n`;
        projectsContent += `> ${proj.desc}\n\n`;
        if (proj.tech && proj.tech.length) {
          // If tech is a string, handle it. If it's an array, map it.
          const techList = Array.isArray(proj.tech) ? proj.tech : [proj.tech];
          projectsContent += `**Tech:** ${techList.join(', ')}<br>\n`;
        }
        projectsContent += `**Status:** ${proj.status || 'Active'} | **Version:** ${proj.version || '1.0'}\n\n`;
      }
      
      readme = replaceBetween(readme, '<!-- tina-projects-start -->', '<!-- tina-projects-end -->', projectsContent);
    } catch (e) {
      console.log('Could not process projects:', e.message);
    }

    // 4. Update Team
    try {
      const teamPath = path.join(CONTENT_DIR, 'team', 'directory.json');
      const teamData = JSON.parse(await fs.readFile(teamPath, 'utf-8'));
      
      let teamContent = '\n<div align="center">\n\n### 👑 Leadership\n\n<table width="100%">\n';
      
      const renderMemberCard = (member, colspan = 1) => {
        if (!member) return '';
        const name = member.name || 'TBA';
        const role = member.role || 'Member';
        const img = member.img || 'https://via.placeholder.com/100';
        const github = member.socialLinks?.github || '#';
        
        return `
<td align="center" colspan="${colspan}">
  <a href="${github}">
    <img src="${img}" width="100px;" style="border-radius:50%;" alt="${name}"/>
    <br />
    <sub><b>${name}</b></sub>
  </a>
  <br />
  <i>${role}</i>
</td>`;
      };

      const leadership = [];
      if (teamData.tier1) {
        leadership.push(teamData.tier1.teamLead, teamData.tier1.coTeamLead);
      }
      if (teamData.tier2) {
        leadership.push(teamData.tier2.techLead, teamData.tier2.coTechLead);
      }
      if (teamData.tier3) {
        leadership.push(teamData.tier3.marketingLead, teamData.tier3.eventManager, teamData.tier3.designLead, teamData.tier3.creativeLead, teamData.tier3.socialMediaManager, teamData.tier3.financeManager);
      }
      
      const validLeadership = leadership.filter(Boolean);
      for (let i = 0; i < validLeadership.length; i += 4) {
        const rowMembers = validLeadership.slice(i, i + 4);
        teamContent += '<tr>\n';
        if (rowMembers.length === 2) {
          // Center 2 members in a 4-col table using colspan=2
          teamContent += rowMembers.map(m => renderMemberCard(m, 2)).join('');
        } else {
          teamContent += rowMembers.map(m => renderMemberCard(m, 1)).join('');
        }
        teamContent += '\n</tr>\n';
      }
      teamContent += '</table>\n\n';
      
      if (teamData.core && teamData.core.length > 0) {
        teamContent += '### 🌟 Core Contributors\n\n<table width="100%">\n';
        for (let i = 0; i < teamData.core.length; i += 4) {
          const rowMembers = teamData.core.slice(i, i + 4);
          teamContent += '<tr>\n';
          if (rowMembers.length === 2) {
            teamContent += rowMembers.map(m => renderMemberCard(m, 2)).join('');
          } else {
            teamContent += rowMembers.map(m => renderMemberCard(m, 1)).join('');
          }
          teamContent += '\n</tr>\n';
        }
        teamContent += '</table>\n';
      }
      
      teamContent += '</div>\n';

      readme = replaceBetween(readme, '<!-- tina-team-start -->', '<!-- tina-team-end -->', teamContent);
    } catch (e) {
      console.log('Could not process team:', e.message);
    }

    await fs.writeFile(README_PATH, readme, 'utf-8');
    console.log('README.md updated successfully!');
  } catch (error) {
    console.error('Failed to update README:', error);
    process.exit(1);
  }
}

function replaceBetween(string, startRegex, endRegex, replacement) {
  const startIndex = string.indexOf(startRegex);
  const endIndex = string.indexOf(endRegex);
  if (startIndex !== -1 && endIndex !== -1) {
    return (
      string.substring(0, startIndex + startRegex.length) +
      '\n' +
      replacement.trim() +
      '\n' +
      string.substring(endIndex)
    );
  }
  return string;
}

updateReadme();
