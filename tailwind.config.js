/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{jsx,tsx}'],
    presets: [require("nativewind/preset")],
    plugins: [require('tailwindcss-radix-colors')],
};
