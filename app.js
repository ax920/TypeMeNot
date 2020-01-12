const express = require('express')
const app = express()
const port = 3000
const googleapis = require('googleapis');
const axios = require('axios');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', function (req, res) {
    // console.log(req);
    console.log("hittt");

    API_KEY = 'AIzaSyC-eLf9ccmMeqriaFLURu_A5Hpn8jcFCBs'
    DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'

    const Perspective = require('perspective-api-client');
    const perspective = new Perspective({ apiKey: "AIzaSyC-eLf9ccmMeqriaFLURu_A5Hpn8jcFCBs" });
    var FINAL_SCORE;

    (async () => {
        const text = 'you empty-headed animal food trough wiper!';
        const result = await perspective.analyze(text);
        FINAL_SCORE = result.attributeScores.TOXICITY.spanScores[0].score.value
        console.log(result.attributeScores.TOXICITY.spanScores[0].score.value);
        console.log(JSON.stringify(result, null, 2));
    })();
    res.json({ score: FINAL_SCORE });
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))