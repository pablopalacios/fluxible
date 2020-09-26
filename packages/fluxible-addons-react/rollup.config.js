import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/fluxible-addons-react.cjs.js",
      format: "cjs"
    },
    {
      file: "dist/fluxible-addons-react.esm.js",
      format: "esm"
    }
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: "bundled" }),
    commonjs(),
    terser()
  ],
  external: ["prop-types", "react", "react-dom"]
};
