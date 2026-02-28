/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1B5E20',
                accent: '#FF6F00',
                bg: '#FAFAF7',
                dark: '#0D1B0F',
                text: '#1A1A1A',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                card: '16px',
                pill: '9999px',
                button: '10px',
            }
        },
    },
    plugins: [],
}
