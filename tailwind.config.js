/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // AGGIUNGI QUESTO BLOCCO FONTFAMILY
            fontFamily: {
                sans: ['Inter', 'sans-serif'],      // Font di default per tutto il testo
                display: ['Space Grotesk', 'sans-serif'], // Font speciale per i titoli
            },
            // ... qui sotto c'erano i tuoi colori (colors: { ... }) lasciali stare
            colors: {
                'tech-bg': '#0f172a',
                'tech-card': '#1e293b',
                'tech-primary': '#38bdf8',
                'tech-border': '#334155',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}