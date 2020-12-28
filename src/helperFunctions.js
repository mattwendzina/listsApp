module.exports = {
    randomId: () => {
        var randLetter = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
        );
        var uniqid = randLetter + Date.now();
        return uniqid;
    },
};
