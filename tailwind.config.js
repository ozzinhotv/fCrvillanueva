/**
 * Tailwind configuration added to provide custom overlay colors used by the
 * `overlayColor` input on the Hero component. These create utilities like
 * `bg-overlay-black/20`, `bg-overlay-red/30`, etc. Tailwind v4 syntax.
 */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // custom overlay color tokens (use with opacity, e.g. '/20' for 20%)
        'overlay-black': '#000000',
        'overlay-red': '#b91c1c',
        'overlay-blue': '#1e40af',
        'overlay-green': '#15803d',
        'overlay-yellow': '#ca8a04'
      }
    }
  },
  plugins: [
    require('daisyui')
  ]
}
