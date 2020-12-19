import React from 'react';
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

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
            <Form.Label>{`Change sorting list size: ${props.sliderValue}`} </Form.Label>
            <RangeSlider
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
