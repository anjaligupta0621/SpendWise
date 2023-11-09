export default ({ config }) => ({
    ...config,
    name: "frontend",
    slug: "frontend",
    extra: {
      storybookEnabled: process.env.STORYBOOK_ENABLED,
    },
  });
  