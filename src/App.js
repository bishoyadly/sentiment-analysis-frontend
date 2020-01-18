import React from 'react';
import appStyles from './App.module.scss';
import SentimentAnalysis from "./SentimentAnalysis/SentimentAnalysis";
function App() {
    return (
        <div className={appStyles.appContainer}>
            <SentimentAnalysis/>
        </div>
    );
}

export default App;
