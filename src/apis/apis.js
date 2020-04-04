import axios from 'axios';

export function textSentimentAnalysis(sentence) {
    return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/sentiment-analysis`, {
        sentence
    });
}