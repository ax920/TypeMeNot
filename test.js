var IDLE_TIMEOUT = 5; //seconds
var _idleSecondsTimer = null;
var _idleSecondsCounter = 0;
var recentcomment = "";

document.onkeypress = function () {
    _idleSecondsCounter = 0;
    _idleSecondsTimer = window.setInterval(CheckIdleTime, 5000);
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
    const url = "https://stunning-hue-264821.wl.r.appspot.com/";
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
                console.log(data);
                if (data.score >= 0.9) {
                    var elem = document.createElement('div');
                    elem.style.cssText = 'position:absolute;width:100%;height:150px;opacity:0.2;z-index:100;background:#ff8d00;box-shadow: 0px 0px 40px 20px #ff8d00';
                    document.body.appendChild(elem);
                    alert("how about let's tone it down a little");
                    // chrome.browserAction.setIcon({
                    //     path: "images/red.png"
                    // });
                } else {
                    // Remove heated css
                }
            });
        })
    }

}