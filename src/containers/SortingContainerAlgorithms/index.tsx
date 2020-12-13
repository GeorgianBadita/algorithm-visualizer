import React from 'react';
import { changeAlgorithm } from '../../store/app/actions';
import { initSort } from '../../store/sorting/actions';

const mapDispatchToProps = {
    initSort: initSort,
    setSelectedAlg: changeAlgorithm,
};

export const SortingContainerAlgorithms = () => {
    return <div>Here</div>;
};
