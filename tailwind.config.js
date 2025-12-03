/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                'tech-bg': '#020617',  // Blu scuro profondo
                'tech-card': '#0f172a', // Card bluastra
                'tech-border': '#1e293b',
                'tech-primary': '#38bdf8',
                'tech-secondary': '#818cf8',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}