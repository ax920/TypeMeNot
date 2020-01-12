// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) { });
// });

chrome.runtime.onInstalled.addListener(function () {

  // chrome.tabs.executeScript(tabs[0].id, { file: "test.js" });
  var IDLE_TIMEOUT = 3; //seconds
  var _idleSecondsTimer = null;
  var _idleSecondsCounter = 0;

  // chrome.runtime.sendMessage({
  //   msg: "something_completed",
  //   data: {
  //     subject: "Loading",
  //     content: "Just completed!"
  //   }
  // });

  document.onkeypress = function () {
    _idleSecondsCounter = 0;
    // _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);
  };

  _idleSecondsTimer = window.setInterval(CheckIdleTime, 3000);

  function CheckIdleTime() {
    _idleSecondsCounter++;
    var oPanel = document.getElementById("SecondsUntilExpire");
    if (oPanel)
      oPanel.innerHTML = (IDLE_TIMEOUT - _idleSecondsCounter) + "";
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
      // window.clearInterval(_idleSecondsTimer);

      // CALCULATE
      getToxicity();

      // _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);
    }
  }

  function getToxicity() {
    var textToRate;
    if (document.activeElement.value) {
      textToRate = document.activeElement.value;
    } else if (document.activeElement.textContent) {
      textToRate = document.activeElement.textContent;
    } else {
      return;
    }
    const url = "http://localhost:3000";
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: textToRate
      }),
    }).then(res => res.json).then(posts => console.log(posts.score));
  }

  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'reddit.com' },
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'facebook.com' },
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'twitter.com' },
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'youtube.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
