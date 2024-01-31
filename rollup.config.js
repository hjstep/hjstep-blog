import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

export default {
  input: "./index.js", // 진입점 파일 설정
  output: {
    file: "dist/index.js", // 번들 파일 경로
    format: "iife", // 즉시 실행 함수 표현식 (웹 브라우저에서 실행하기 위함)
    sourcemap: true, // 소스 맵 활성화
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
      extract: 'dist/index.css', 
    })
  ],
};
