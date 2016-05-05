import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import withScreenWidth from './../../withScreenWidth.jsx'

const c = StyleSheet.combineStyles
const styles = StyleSheet.create({
  container: {
    //width: 7362, 
    //transition: `left 1ms cubic-bezier(0.24, 0.27, 0.36, 0.97)`, 
    //transform: `translate3d(-818px, 0px, 0px)`,
    position: 'fixed',
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  image: {
  	height: '100%',
    width: '70%',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    transition: 'all 0.8s cubic-bezier(0.24, 0.27, 0.36, 0.97)',
  },
  zeroImage: {
  	left: '-70%',
  },
  firstImage: {
    left: 0,
  },
  secondImage: {
  	left: '70%',
  },
  thirdImage: {
  	left: '140%',
  },
  firstImageOverlay: {
    background: 'rgba(0, 0, 0, 0.8)',
  	height: '100%',
    width: '70%',
    position: 'absolute',
  }
})

class Background extends Component {

	state = {
	  images: [
			{
				backgroundImage: `url(${require('./img/graphic-designer/bg-1.jpg')})`,
				backgroundPositionY: '-200px',
			},
			{ // Bg 2 follows on from the edge of 1
				backgroundImage: `url(${require('./img/graphic-designer/bg-2.jpg')})`,
				backgroundPositionY: '-200px',
			},
			require('./img/graphic-designer/bg-3.jpg'),
			require('./img/graphic-designer/bg-4.jpg'),
			require('./img/graphic-designer/bg-5.jpg'),
		],
		// Points at the left most visible image
		currentIndex: 0,
	};

	/**
	 * Push an image on to the stack, transitions this into
	 * view on the right hand side, you must push another image for the first
	 * one to be the main one in view.
	 */
	push = (image) => {
		var { currentIndex } = this.state
		currentIndex++
		this.setState({ currentIndex })
	};

	goBack = () => {

	};


	componentDidMount = () => {
		setTimeout(() => {
			this.push()
		}, 5000)
	};

	render = () => {

		var { screenWidth } = this.props
		var { currentIndex, images, } = this.state

		var imageStyles = images.map(image => {
			if (typeof image == 'string')
				return { backgroundImage: `url(${image})`, }
			return image
		})

		console.log(require('util').inspect(imageStyles))

		return <div className={styles.container}>
			<div 
				className={c(styles.image, styles.zeroImage)} 
				key={currentIndex - 1} 
				style={imageStyles[currentIndex - 1]}
			/>
			<div 
				className={c(styles.image, styles.firstImage)} 
				key={currentIndex} 
				style={imageStyles[currentIndex]}
			/>
			<div 
				className={c(styles.image, styles.secondImage)} 
				key={currentIndex + 1} 
				style={imageStyles[currentIndex + 1]}
			/>
			<div 
				className={c(styles.image, styles.thirdImage)} 
				key={currentIndex + 2} 
				style={imageStyles[currentIndex + 2]}
			/>
			<div 
				className={styles.firstImageOverlay} 
				key="firstImageOverlay" 
			/>
	  </div>
  }
}

export default withScreenWidth(Background)