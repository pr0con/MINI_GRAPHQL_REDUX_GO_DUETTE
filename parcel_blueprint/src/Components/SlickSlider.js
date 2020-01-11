import React from "react";
import styled from 'styled-components';
import Slick from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StyledSlickSlider = styled.div`
`


export function SlickSlider(props) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1
	}
	
	return(
		<StyledSlickSlider  className="slick">
			<Slick {...settings}>
				{ props.elements.length >= 1 && props.elements.map((se) => (
					<img src={se} />
				))}
			</Slick>
		</StyledSlickSlider>
	)
}	