// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let popup = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

popup.onclick = function (element) {
  console.log(document.activeElement);

  let color = element.target.value;
  // let code = document.createElement('div');
  // elem.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
  // document.body.appendChild(elem);
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    console.log(tabs)
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.executeScript(
        tabs[i].id,
        { file: "test.js" });
    }
  });
};

