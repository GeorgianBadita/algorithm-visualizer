import { Heading, Pane } from 'evergreen-ui';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import graphImage from '../../assets/images/homepage/graph.png';
import sortImage from '../../assets/images/homepage/sorting.png';
import AppCarousel from '../../components/AppCarousel';
import { CarouselImage } from '../../utils/types/app-types/carousel-image-type';

const carouselImages: CarouselImage[] = [
    {
        image: graphImage,
        description: 'Nice Graph Image',
    },
    {
        image: sortImage,
        description: 'Nice Sort Image',
    },
];

//EVERGREEN
const HomePage = withRouter(() => {
    return (
        <div>
            <AppCarousel interval={1000} carouselItems={carouselImages} />
            <Pane clearfix alignContent={'center'} display={'block'}>
                <Pane
                    float={'left'}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    hoverElevation={4}
                    elevation={1}
                    backgroundColor="white"
                    width={'45%'}
                    height={'100%'}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Heading size={800}>Graph Algorithms</Heading>
                    <Link to={'/graphs'}>
                        <img style={{ width: '525px', height: '300px' }} src={graphImage}></img>
                    </Link>
                </Pane>
                <Pane
                    float={'right'}
                    hoverElevation={4}
                    elevation={1}
                    backgroundColor="white"
                    width={'45%'}
                    height={'100%'}
                    margin={24}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Heading size={800}>Sorting Algorithms</Heading>
                    <Link to={'/sorting'}>
                        <img style={{ width: '525px', height: '300px' }} src={sortImage}></img>
                    </Link>
                </Pane>
            </Pane>
        </div>
    );
});

export default HomePage;
