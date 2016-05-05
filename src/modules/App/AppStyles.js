import { StyleSheet } from 'react-look'

const fontStyles = {fontWeight: 400,}
const fontFile = require('./fonts/Dosis-Light.ttf')

StyleSheet.font('Dosis', [fontFile], fontStyles)

StyleSheet.addCSS({
  'body': {
    fontFamily: `'Dosis', sans-serif`,
  	color: 'white',
  },
  'h1, h2, h3, h4, h5': {
  	textTransform: 'uppercase',
  	fontWeight: 500,
  	marginTop: 0,
  },
	'@media (min-width: 992px)': {
		h1: {
			fontSize: 68,
			letterSpacing: 5.44,
			marginBottom: 35,
			marginTop: 37,
		},
		h2: {
			fontSize: 56,
			//lineHeight: '58px',
			letterSpacing: 4.48,
			marginBottom: 38,
		},
		h3: {
			fontSize: 44,
			letterSpacing: 2.72,
			marginBottom: 29,
			marginTop: 29,
		}
	},
	'@media (min-width: 768px, max-width: 991px)': {
		h1: {
			fontSize: 56,
			letterSpacing: 4.48,
			marginBottom: 32,
			marginTop: 31,
		},
		h2: {
			fontSize: 48,
			marginBottom: 33,
			marginTop: 31,
		},
		h3: {
			fontSize: 33,
			letterSpacing: 2.63,
			marginBottom: 28,
			marginTop: 28,
		},
	},
	'@media (min-width: 768px, max-width: 767px)': {
		h1: {
			fontSize: 44,
			letterSpacing: 3.52,
			marginBottom: 25,
			marginTop: 24,
		},
		h2: {
			fontSize: 34,
			marginBottom: 23,
			marginTop: 22,
		},
		h3: {
			fontSize: 24,
			letterSpacing: 1.9,
			marginBottom: 21,
			marginTop: 21,
		},
	},
})
