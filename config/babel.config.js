// @ts-check
// We aim to have the same support as Next.js
// https://nextjs.org/docs/getting-started#system-requirements
// https://nextjs.org/docs/basic-features/supported-browsers-features

/** @type {import("@babel/core").ConfigFunction} */
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: 12 } }], "@babel/preset-typescript"],
  plugins: ["@babel/plugin-proposal-optional-catch-binding", "@babel/plugin-transform-runtime"],
  ignore: ["../examples/**"],
  comments: false,
  overrides: [
    //   {
    //     test: ["../src/react/index.tsx", "../src/utils/logger.ts", "../src/core/errors.ts", "../src/client/**"],
    //     presets: [
    //       ["@babel/preset-env", { targets: { ie: 11 } }],
    //       ["@babel/preset-react", { runtime: "automatic" }],
    //     ],
    //   },
    //   {
    //     test: ["../src/core/pages/*.tsx"],
    //     presets: ["react"],
    //     plugins: [["jsx-pragmatic", { module: "react", import: "React" }]],
    //   },
  ],
};
