chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request) {
            alert("fuck")
        }
        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
            alert("fuck")
        }
    }
);
alert("asdfasdf")
console.log("asdfaf")
console.log(document.activeElement)