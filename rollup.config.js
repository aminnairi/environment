import {terser} from "rollup-plugin-terser";

export default {
    input: "environment.js",
    plugins: [
        terser()
    ],
    output: {
        banner: "#!/usr/bin/env node",
        file: "environment.min.js",
        format: "cjs"
    }
}