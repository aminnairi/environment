import {terser} from "rollup-plugin-terser";

export default {
    input: "environment.js",
    plugins: [
        terser()
    ],
    output: {
        file: "environment.min.js",
        format: "cjs"
    }
}