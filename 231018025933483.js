(function () {
    var dateString = "2024-11-05";
    var dateArr = dateString.split("-");
    var date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    var deleteTime = date.getTime();

    localStorage.setItem("PLAYER_JSBASE", "https://player-dev.sonyliv.com/assets/mweb/107/10.25.01");
    setExpiry("PLAYER_JSBASE", deleteTime);

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


})();
