export default {  
  content: ['./index.html', './src/**/*,{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
        shake: 'shake 0.3s ease-in-out infinite',
        typing: 'typing 1.5s infinite alternate',
      },
      keyframes: { 
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glow: {
          '0%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.8)' },
          '50%': { textShadow: '0 0 20px rgba(255, 255, 255, 1)' },
          '100%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
          '75%': { transform: 'translateX(-3px)' },
        },
        typing: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        winky: ['Winky Sans', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        boldonse: ['Boldonse', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
