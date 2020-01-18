import React from 'react';
import {Select, Slider, Input, Button} from "antd";
import {BrowserRouter, Link} from 'react-router-dom';
import sentimentAnalysisStyles from './SentimentAnalysis.module.scss';

const Option = Select.Option;
const TextArea = Input.TextArea;
export default function SentimentAnalysis() {
    return (
        <div className={sentimentAnalysisStyles.sentimentContainer}>
            <BrowserRouter>
                <Link to={'/'}>
                    <h1 className={sentimentAnalysisStyles.sentimentHeader}>Sentiment Analysis</h1>
                </Link>
            </BrowserRouter>
            <Select
                size={"large"}
                className={sentimentAnalysisStyles.voicesDropDown}
                defaultValue={"option1"}
            >
                <Option value={"option1"}>
                    Select an option
                </Option>
            </Select>

            <div className={sentimentAnalysisStyles.sliderContainer}>
                <label> Rate </label>
                <Slider defaultValue={30}/>
            </div>

            <div className={sentimentAnalysisStyles.sliderContainer}>
                <label> Pitch </label>
                <Slider defaultValue={30}/>
            </div>

            <TextArea
                className={sentimentAnalysisStyles.inputTextarea}
                rows={8} autosize={false}/>

            <Button
                className={sentimentAnalysisStyles.analyzeButton}
            >
                Analyze
            </Button>

        </div>
    );
}