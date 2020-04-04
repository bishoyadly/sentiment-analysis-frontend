import React, {useEffect, useState} from 'react';
import {Select, Slider, Input, Button} from "antd";
import {BrowserRouter, Link} from 'react-router-dom';
import sentimentAnalysisStyles from './SentimentAnalysis.module.scss';
import {textSentimentAnalysis} from "../apis/apis";

const Option = Select.Option;
const TextArea = Input.TextArea;

export default function SentimentAnalysis() {

    const [availableVoices, setAvailableVoices] = useState([]);
    const [sentence, setSentence] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('Google US English');
    const [voiceRate, setVoiceRate] = useState(1);
    const [voicePitch, setVoicePitch] = useState(1);

    window.speechSynthesis.onvoiceschanged = function () {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
    };

    async function analyzeSentence() {
        const response = await textSentimentAnalysis(sentence);
        const feedbackSentence = response.data.responseSentence;

        const message = new SpeechSynthesisUtterance(feedbackSentence);
        const voiceIndex = availableVoices.findIndex(voice => voice.name === selectedVoice);

        message.voice = availableVoices[voiceIndex];
        message.rate = voiceRate;
        message.pitch = voicePitch;
        window.speechSynthesis.speak(message);
    }

    function onSelect(selectedOption) {
        setSelectedVoice(selectedOption);
    }

    function onRateChange(selectedRateValue) {
        const rate = selectedRateValue * 10 / 100;
        setVoiceRate(rate);
    }

    function onPitchChange(selectedPitchValue) {
        const pitch = selectedPitchValue * 2 / 100;
        setVoicePitch(pitch);
    }

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
                defaultValue={selectedVoice}
                onSelect={onSelect}
            >
                {
                    availableVoices.map(
                        voice =>
                            <Option
                                key={voice.name}
                                value={voice.name}
                            >
                                {voice.name}
                            </Option>
                    )

                }

            </Select>

            <div className={sentimentAnalysisStyles.sliderContainer}>
                <label> Rate </label>
                <Slider
                    defaultValue={10}
                    onChange={onRateChange}
                />
            </div>

            <div className={sentimentAnalysisStyles.sliderContainer}>
                <label> Pitch </label>
                <Slider
                    defaultValue={10}
                    onChange={onPitchChange}
                />
            </div>

            <TextArea
                className={sentimentAnalysisStyles.inputTextarea}
                rows={8}
                autosize="false"
                onChange={event => setSentence(event.target.value)}
            />

            <Button
                className={sentimentAnalysisStyles.analyzeButton}
                onClick={analyzeSentence}
            >
                Analyze
            </Button>

        </div>
    );
}