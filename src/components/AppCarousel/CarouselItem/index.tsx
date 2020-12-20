import React from 'react';
import { Carousel } from 'react-bootstrap';

type CarouselItemProps = {
    image: string;
    interval: number;
    description: string;
};

const CarouselItem = (props: CarouselItemProps): JSX.Element => {
    return (
        <Carousel.Item interval={props.interval}>
            <img alt={props.description} src={props.image} className={'d-block w-100'} />
            <Carousel.Caption>
                <h3>{props.description}</h3>
            </Carousel.Caption>
        </Carousel.Item>
    );
};

export default CarouselItem;
