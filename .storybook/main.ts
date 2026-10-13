import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/storybook/**/*.mdx",
    "../src/storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  typescript: {
    reactDocgen: 'react-docgen',
    check: false,
  },
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-designs",
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true,
          docs: true,
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ["../src/storybook/assets"],
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins || []),
      {
        name: 'storybook:no-cache-plugin',
        transformIndexHtml(html) {
          return html.replace(
            '<head>',
            `<head>
              <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
              <meta http-equiv="Pragma" content="no-cache" />
              <meta http-equiv="Expires" content="0" />`
          );
        },
      },
    ];
    return config;
  },
};

export default config;
