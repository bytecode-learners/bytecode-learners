import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsDir = path.join(__dirname, '..', 'content', 'events');

if (fs.existsSync(eventsDir)) {
  const files = fs.readdirSync(eventsDir).filter(f => f.endsWith('.json'));

  if (files.length > 12) {
    console.log(`[Event Limiter] Found ${files.length} events. Maximum allowed is 12.`);
    
    // Get file stats and sort by modification time (oldest first)
    const fileStats = files.map(file => {
      const filePath = path.join(eventsDir, file);
      return {
        file: filePath,
        time: fs.statSync(filePath).mtime.getTime()
      };
    }).sort((a, b) => a.time - b.time);

    const excess = files.length - 12;
    for (let i = 0; i < excess; i++) {
      fs.unlinkSync(fileStats[i].file);
      console.log(`[Event Limiter] Automatically deleted oldest event: ${path.basename(fileStats[i].file)}`);
    }
  }
}
