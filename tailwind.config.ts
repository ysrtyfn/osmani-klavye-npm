import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/takdim/sahneler/**/*.{js,ts,jsx,tsx,mdx}',
        './src/takdim/unsurlar/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        fontFamily: {},
        extend: {}
    },
    plugins: []
};
export default config;
