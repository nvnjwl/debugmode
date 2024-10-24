var currentVersion = 21;

window.SUPER_DEBUG = (function () {
  function shouldExecute() {
    if (currentVersion > window.SUPER_DEBUG_VERSION) {
      return true;
    }
    return false;
  }

  function init() {
    if (shouldExecute()) {
      PLAYER_PRINT_MANGER.tryPrintingNow();
      setTimeout(function () {
        pollForNewVersion();
      }, 1000);
    } else {
      setTimeout(function () {
        pollAgain();
      }, 1000);
    }
    window.SUPER_DEBUG_VERSION = currentVersion;
  }

  function pollAgain() {
    let filePath = extractCurrentPath();
    loadJavascript(filePath);
  }

  function extractCurrentPath() {
    let currentScriptName = "logsdk.js";
    let scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      let src = scripts[i].src;
      if (src.includes(currentScriptName)) {
        return src;
      }
    }
    return null;
  }

  function loadJavascript(filePath) {
    var script = document.createElement("script");
    script.src = filePath;
    document.head.appendChild(script);
  }

  init();
  return {
    init: init,
    shouldExecute: shouldExecute,
  };
})();

window.PLAYER_PRINT_MANGER = (function () {
  function tryPrintingNow() {
    if (SPN_PLAYER.playerObj) {
      let length =
        SPN_PLAYER.playerObj.dataModel.languageItems.languages.length;
      var lastLang =
        SPN_PLAYER.playerObj.dataModel.languageItems.languages[length - 1];
      var stringLastLang = JSON.stringify(lastLang, null, 2);
      printScreen("stringLastLang :: " + stringLastLang);
    } else {
      printScreen("SPN_PLAYER.playerObj not found");
    }
  }
  tryPrintingNow();

  function createDebugScreen() {
    var div = document.createElement("div");
    div.id = "debugScreen";
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "50%";
    div.style.backgroundColor = "rgba(0,0,0,0.5)";
    div.style.zIndex = "99999";
    div.style.display = "none";
    document.body.appendChild(div);
  }

  function printScreen(message) {
    var debugScreen = document.getElementById("debugScreen");
    if (debugScreen) {
      debugScreen.innerHTML = "";
      debugScreen.style.display = "block";
      var p = document.createElement("p");
      p.style.color = "#fff";
      p.style.fontSize = "20px";
      p.style.fontWeight = "bold";
      p.style.padding = "10px";
      p.innerHTML = message;
      debugScreen.appendChild(p);
    }
  }
  if (!document.getElementById("debugScreen")) {
    createDebugScreen();
  } else {
     document.getElementById("debugScreen").style.height = "10%";
  }

  return {
    tryPrintingNow: tryPrintingNow,
  };
})();
