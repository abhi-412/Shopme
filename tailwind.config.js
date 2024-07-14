/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
        'sm': '560px',
        'md': '768px',
        "xxs" : "180px",
      },
      fontSize: {
        'xs-responsive': 'clamp(0.625rem, 1.5vw, 0.875rem)', // For screens < 380px
        'sm-responsive': 'clamp(0.75rem, 2vw, 1rem)',       // For screens between 380px and 560px
        'md-responsive': 'clamp(0.875rem, 2.5vw, 1.125rem)', // For screens between 560px and 768px
        'lg-responsive': 'clamp(1rem, 3vw, 1.5rem)',        // For screens > 768px
      },
    },
  },
  plugins: [],
}