import React from 'react';
import { Carousel } from 'react-bootstrap';
import { CarouselImage } from '../../utils/types/app-types/carousel-image-type';
import CarouselItem from './CarouselItem';

export type AppCarouselProps = {
    interval: number;
    carouselItems: CarouselImage[];
};

const AppCarousel = (props: AppCarouselProps): JSX.Element => {
    return (
        <Carousel>
            {props.carouselItems.map((el: CarouselImage) => (
                <CarouselItem
                    interval={props.interval}
                    description={el.description}
                    image={el.image}
                    key={el.description}
                />
            ))}
        </Carousel>
    );
};

export default AppCarousel;
