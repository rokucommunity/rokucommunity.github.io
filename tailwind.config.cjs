/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
        fontFamily: {
            'poppins': ['Poppins', 'sans-serif'],
            'mono': ['monospace']
        },
        colors: {
            'white': '#FDFDFD',
            'black': '#292929',
            'alert': '#ADA514',
            'purple-dark': '#581B98',
            'purple': '#9C1DE7',
            'pink': '#F3558E'
        },
        listStyleType: {
            none: 'disc',
            disc: 'disc',
            decimal: 'decimal',
            square: 'square',
            roman: 'upper-roman'
        }
    },
    plugins: []
};
