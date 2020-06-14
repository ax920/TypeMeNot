// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) { });
// });

chrome.runtime.onInstalled.addListener(function () {

  // chrome.tabs.executeScript(tabs[0].id, { file: "test.js" });


  chrome.runtime.sendMessage({
    msg: "something_completed",
    data: {
      subject: "Loading",
      content: "Just completed!"
    }
  });

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
