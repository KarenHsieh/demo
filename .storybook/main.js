/**
 * main.js is the most important config file. This is where we place the main configuration of Storybook.
*/
const path = require("path");

module.exports = {
  // stories: ["../components/**/*.stories.tsx"],
  stories: ["../stories/**/*.stories.js"],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  // Add nextjs preset
  presets: [path.resolve(__dirname, "./next-preset.js")],
};