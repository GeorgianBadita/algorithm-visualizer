import React from 'react';
import { CarouselImage } from '../../utils/types/app-types/carousel-image-type';

// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

export type AppCarouselProps = {
    carouselItems: CarouselImage[];
};

const AppCarousel = (props: AppCarouselProps): JSX.Element => {
    return (
        // <AwesomeSlider>
        //     {props.carouselItems.map((el: CarouselImage) => (
        //         <div data-src={el.image} key={el.image} />
        //     ))}
        // </AwesomeSlider>
        <></>
    );
};

export default AppCarousel;
