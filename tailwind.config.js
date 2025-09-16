module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          wave1: {
            '0%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-15px)' },
            '100%': { transform: 'translateY(0)' },
          },
          wave2: {
            '0%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-15px)' },
            '100%': { transform: 'translateY(0)' },
          },
        },
        animation: {
          wave1: 'wave1 1s ease-in-out infinite',
          wave2: 'wave2 1s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }
  