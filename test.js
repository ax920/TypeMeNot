var IDLE_TIMEOUT = 5; //seconds
var _idleSecondsTimer = null;
var _idleSecondsCounter = 0;
var recentcomment = "";

document.onkeypress = function () {
    _idleSecondsCounter = 0;
    _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);
};

_idleSecondsTimer = window.setInterval(CheckIdleTime, 5000);

function CheckIdleTime() {
    _idleSecondsCounter++;
    var oPanel = document.getElementById("SecondsUntilExpire");
    if (oPanel)
        oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
        if (document.activeElement.isContentEditable && recentcomment !== document.activeElement.textContent) {
            console.log(document.activeElement.textContent);
            recentcomment = document.activeElement.textContent;
            getToxicity(document.activeElement.textContent);
        } else {
            //console.log("not yay");
        }
        //window.clearInterval(_idleSecondsTimer);
    }
}

function getToxicity(text) {
    var textToRate;
    textToRate = text;
    console.log("texttoRate", textToRate)
    // if (document.activeElement.value) {
    //     textToRate = document.activeElement.value;
    // } else if (document.activeElement.textContent) {
    //     textToRate = document.activeElement.textContent;
    // } else {
    //     return;
    // }
    const url = "http://localhost:3000";
    console.log(JSON.stringify({ value: textToRate }));
    if (textToRate) {
        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: JSON.stringify({ value: textToRate }),
        }).then(function (response) {
            response.json().then(function (data) {
                var score = data.score;
                console.log(data.score);
                if (data.score >= 0.75) {
                    alert("chill");
                }
            });
        })
    }

}