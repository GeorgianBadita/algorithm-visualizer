import classes from './HomePage.module.css';
import { Heading, Pane } from 'evergreen-ui';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import graphImage from '../../assets/images/homepage/graph.png';
import sortImage from '../../assets/images/homepage/sorting.png';
import { CarouselImage } from '../../utils/types/app-types/carousel-image-type';
import ReactFullPage from '@fullpage/react-fullpage';
import PresentationSection from './PresentationSection';

const sectionColors: string[] = ['#666A86', '#788AA3', '#92B6B1'];

const HomePage = withRouter(() => {
    return (
        <ReactFullPage
            navigation
            scrollOverflow={true}
            sectionsColor={sectionColors}
            render={({ state, fullpageApi }) => {
                return (
                    <div id="fullpage-wrapper">
                        <PresentationSection something="a" />
                        <div className="section">
                            <div className="slide">
                                <h3>Slide 2.1</h3>
                            </div>
                            <div className="slide">
                                <h3>Slide 2.2</h3>
                            </div>
                            <div className="slide">
                                <h3>Slide 2.3</h3>
                            </div>
                        </div>
                        <div className="section" style={{ textAlign: 'center' }}>
                            <h3>Section 3</h3>
                            <button onClick={() => fullpageApi.moveTo(1, 0)}>Move top</button>
                        </div>
                    </div>
                );
            }}
        />
        // <div>
        //     <div className={classes.carousel}>
        //         <AppCarousel carouselItems={carouselImages} />
        //     </div>
        //     <Pane clearfix alignContent={'center'} display={'block'}>
        //         <Pane
        //             float={'left'}
        //             marginLeft={'auto'}
        //             marginRight={'auto'}
        //             hoverElevation={4}
        //             elevation={1}
        //             backgroundColor="white"
        //             width={'45%'}
        //             height={'100%'}
        //             margin={24}
        //             display="flex"
        //             justifyContent="center"
        //             alignItems="center"
        //             flexDirection="column"
        //         >
        //             <Heading size={800}>Graph Algorithms</Heading>
        //             <Link to={'/graphs'}>
        //                 <img style={{ width: '525px', height: '300px' }} src={graphImage}></img>
        //             </Link>
        //         </Pane>
        //         <Pane
        //             float={'right'}
        //             hoverElevation={4}
        //             elevation={1}
        //             backgroundColor="white"
        //             width={'45%'}
        //             height={'100%'}
        //             margin={24}
        //             display="flex"
        //             justifyContent="center"
        //             alignItems="center"
        //             flexDirection="column"
        //         >
        //             <Heading size={800}>Sorting Algorithms</Heading>
        //             <Link to={'/sorting'}>
        //                 <img style={{ width: '525px', height: '300px' }} src={sortImage}></img>
        //             </Link>
        //         </Pane>
        //     </Pane>
        // </div>
    );
});

export default HomePage;
