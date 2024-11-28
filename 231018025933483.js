(function () {
    var dateString = "2024-11-05";
    var dateArr = dateString.split("-");
    var date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    var deleteTime = date.getTime();

    //localStorage.setItem("PLAYER_JSBASE", "https://player-dev.sonyliv.com/assets/mweb/107/10.25.01");
    //setExpiry("PLAYER_JSBASE", deleteTime);

    function setExpiry(keyName, expiryDate) {
        var playerKeysExpiry = localStorage.getItem("PLAYER_KEYS_EXPIRY");
        try {
            var playerKeysExpiryObj = JSON.parse(playerKeysExpiry);
            playerKeysExpiryObj[keyName] = expiryDate;
            playerKeysExpiry = JSON.stringify(playerKeysExpiryObj);
            localStorage.setItem("PLAYER_KEYS_EXPIRY", playerKeysExpiry);
        } catch (error) {
            console.error(error);
        }
    }


    function loadJS(url) {
        var script = document.createElement("script");
        script.src = url;
        document.head.appendChild(script);
    }

    function extractCurrentPath() {
        var curScriptName = "231018025933483.js";
        var scripts = document.getElementsByTagName("script");
        var surl = "";
        for (var si = 0; si < scripts.length; si++) {
            if (scripts[si].src && scripts[si].src.indexOf(curScriptName) > 0) {
                surl = scripts[si].src; 
            }
        }
        return surl;
    }

    let superDebugSDKBasePath = extractCurrentPath();
    let superDebugSDKFullPath = superDebugSDKBasePath + "logsdk.js";
    loadJS(superDebugSDKFullPath);

})();
