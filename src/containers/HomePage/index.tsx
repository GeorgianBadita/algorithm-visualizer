import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactFullPage from '@fullpage/react-fullpage';
import PresentationSection from './PresentationSection';
import AlgorithmsSection from './AlgorithmsSection';

import './overrides.css';

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
                        <PresentationSection />
                        <AlgorithmsSection />

                        {/* <div className="section" style={{ textAlign: 'center' }}>
                            <h3>Section 3</h3>
                            <button onClick={() => fullpageApi.moveTo(1, 0)}>Move top</button>
                        </div> */}
                    </div>
                );
            }}
        />
    );
});

export default HomePage;
