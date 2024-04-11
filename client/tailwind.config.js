/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        'qm': 'calc((135vh - 6 * 40px) / 5)',
        '5vh': '5vh',
        '10vh': '10vh',
        '15vh': '15vh',
        '30vh': '30vh',
        '50vh': '50vh',
        'half': '50%',
        'third': '33%',
        '2third': '66%',
        'screen': '100vw',
        '20px': '20px',
        '50px' : '50px',
        '77px': '77px',
        '100px': '100px',
        '200px': '200px',
        '250px' :'250px',
        '350px': '350px',
        '800px': '800px',
      },
      width: {
        '100vw': '100vw',
        '25px': '25px',
        'half': '50%',
        'third': '33%',
      },
      maxWidth: {
        '225px': '225px',
      },
      height: {
        '40vh': '40vh',
        '100vh': '100vh',
        '2vh': '200vh',
      },
      colors: {
        'green': '#4DED9D',
        'purple': '#9AAFFD',
        'red': '#DF2C14',
        'grey': '#888888',
        'dark': '#CCCCCC',
      },
      fontSize: {
        '40': '40px',
        '30': '30px',
      },
      borderWidth: {

      },
      boxShadow: {
        'navbar': '0 5px 20px -5px #9AAFFD',
      },
      backgroundImage: {
        'bg': 'url("https://cdn.dribbble.com/users/6884444/screenshots/16510614/media/a4cd35a0e9c656d903b42da84e46471b.jpg?resize=1200x900&vertical=center")'
      },
    },
  },
  plugins: [],
}

