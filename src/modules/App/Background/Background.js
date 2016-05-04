import React, { Component } from 'react'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  Container: {
    width: 7362, 
    transition: `transform 0ms cubic-bezier(0.24, 0.27, 0.36, 0.97)`, 
    transform: `translate3d(-818px, 0px, 0px)`,
  }
})

const images = [
	require('./img/photographer/bg-5.jpg'),
	require('./img/graphic-designer/bg-1.jpg'),
	require('./img/graphic-designer/bg-2.jpg'),
	require('./img/graphic-designer/bg-3.jpg'),
	require('./img/graphic-designer/bg-4.jpg'),
	require('./img/graphic-designer/bg-4.jpg'),
	require('./img/photographer/bg-5.jpg'),
	require('./img/graphic-designer/bg-1.jpg'),
	require('./img/graphic-designer/bg-2.jpg'),
]

const heights = [
	460.125, 
	920.25,
	920.25,
	920.25,
	920.25,
	920.25,
	460.125,
	920.25,
	920.25,
]

const tops = [ 
	-48.5625, 
	-278.625,
	-278.625,
	-278.625,
	-278.625,
	-278.625,
	-48.5625, 
	-278.625,
	-278.625,
]

class Background extends Component {
	render = () => {
		<div className={styles.Container}>
			{images.map((image, i) => <div>
				<img 
					src={image} 
					style={{
						width: 818,
						height: heights[i],
						top: tops[i],
						left: i * 818,
						position: 'absolute',
					}}
				/>
			</div>)}
	  </div>
  }
}

export default Background