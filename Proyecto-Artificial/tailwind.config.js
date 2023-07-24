/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'Font1':['Work Sans', 'sans-serif'],
        'Font2' :['Arial Black', 'sans-serif'],
        'Font3' :['Century Gothic','sans-serif'],

      },
    },
    colors:{
      'Rojo':    '#E2231A',
      'Azul':    '#263562',
      'Negro':   '#383636',
      'Celeste': '#D9DDE8',
      'Gris':    '#F4EFEF',
      "azul-ver": "#035AA6",
      "amarillo-editar": "#BF7E04",
      "rojo-eliminar": "#A61F1F",
    }
  },
  plugins: [],
}

