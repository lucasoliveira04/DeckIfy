export default {
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
      },
      keyframe: {
        glow: {
          '0%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.8)' },
          '50%': { textShadow: '0 0 20px rgba(255, 255, 255, 1)' },
          '100%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.8)' },
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
