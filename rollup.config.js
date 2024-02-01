import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

export default {
  input: "./index.js",
  output: {
    file: "dist/index.js",
    format: "iife",
    // sourcemap: true,
  },
  treeshake: {
    preset: 'recommended'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
    postcss({
      plugins: [
        cssnano()
       ],
       minimize: true,
      extract: 'index.css', 
    })
  ],
};
