import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const memberFields: any = [
  { type: "string", name: "name", label: "Name", required: true },
  { type: "image", name: "img", label: "Profile Image" },
  { type: "string", name: "role", label: "Role", required: true },
  {
    type: "object",
    name: "socialLinks",
    label: "Social Links",
    fields: [
      { type: "string", name: "github", label: "GitHub URL" },
      { type: "string", name: "linkedin", label: "LinkedIn URL" },
    ],
  },
];

export default defineConfig({
  branch,
  clientId: process.env.VITE_TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || "",
  token: process.env.VITE_TINA_TOKEN || process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  schema: {
    collections: [
      {
        name: "stats",
        label: "About Stats",
        path: "content/stats",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "lines_committed", label: "Lines Committed" },
          { type: "string", name: "active_learners", label: "Active Learners" },
          { type: "number", name: "live_events", label: "Live Events" },
          { type: "number", name: "kernel_achievements", label: "Kernel Achievements" },
        ],
      },
      {
        name: "events",
        label: "Events",
        path: "content/events",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "img", label: "Image URL" },
          { type: "string", name: "date", label: "Date (e.g. 24 OCT)", required: true },
          { type: "string", name: "location", label: "Location" },
          { type: "string", name: "tag", label: "Tag" },
        ],
      },
      {
        name: "team",
        label: "Team Directory",
        path: "content/team",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "tier1",
            label: "Tier 1 (Leads)",
            fields: [
              { type: "object", name: "teamLead", label: "Team Lead", fields: memberFields },
              { type: "object", name: "coTeamLead", label: "Co-Team Lead", fields: memberFields },
            ]
          },
          {
            type: "object",
            name: "tier2",
            label: "Tier 2 (Tech Leads)",
            fields: [
              { type: "object", name: "techLead", label: "Tech Lead", fields: memberFields },
              { type: "object", name: "coTechLead", label: "Co-Tech Lead", fields: memberFields },
            ]
          },
          {
            type: "object",
            name: "tier3",
            label: "Tier 3 (Other Ranks)",
            fields: [
              { type: "object", name: "marketingLead", label: "Marketing Lead", fields: memberFields },
              { type: "object", name: "eventManager", label: "Event Manager", fields: memberFields },
              { type: "object", name: "designLead", label: "Design Lead", fields: memberFields },
              { type: "object", name: "creativeLead", label: "Creative Lead", fields: memberFields },
              { type: "object", name: "socialMediaManager", label: "Social Media Manager", fields: memberFields },
              { type: "object", name: "financeManager", label: "Finance Manager", fields: memberFields },
            ]
          },
          {
            type: "object",
            list: true,
            name: "core",
            label: "Core Members",
            ui: { itemProps: (item) => ({ label: item?.name || "New Member" }) },
            fields: memberFields,
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "content/projects",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "desc", label: "Description", ui: { component: "textarea" }, required: true },
          { type: "string", name: "tech", label: "Technologies", list: true },
          { type: "string", name: "repo", label: "Repository Link", required: true },
          { type: "string", name: "version", label: "Version" },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["Active", "Archived", "In Progress", "Beta"],
          },
          { type: "boolean", name: "isPublic", label: "Is Public" },
        ],
      },
    ],
  },
});
