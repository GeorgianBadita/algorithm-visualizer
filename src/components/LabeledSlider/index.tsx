import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import classes from './LabeledSlider.module.css';

export type LabeledSliderProps = {
    sliderValue: number;
    step: number;
    min: number;
    max: number;
    onSliderChange: (newVal: number) => void;
    disabled: boolean;
};

const LabeledSlider = (props: LabeledSliderProps): JSX.Element => {
    return (
        <>
            <label className={classes.label}>{`Change sorting list size: ${props.sliderValue}`} </label>
            <RangeSlider
                variant="light"
                disabled={props.disabled}
                step={props.step}
                min={props.min}
                value={props.sliderValue}
                max={props.max}
                onChange={(e) => props.onSliderChange(parseInt(e.target.value as string, 10))}
            />
        </>
    );
};

export default LabeledSlider;
