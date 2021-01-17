module.exports = {
    randomId: () => {
        var randLetter = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
        );
        var uniqid = randLetter + Date.now();
        return uniqid;
    },
    createClass: (baseClass, modifiers, classes) => {
        if (typeof baseClass !== 'string') {
            throw new Error('baseClass must be a string');
        }

        if (baseClass.length === 0) {
            throw new Error('Must supply baseClass');
        }
        const propClassNames = [baseClass, modifiers]
            .map((classname) => {
                return classes[classname];
            })
            .join(' ');

        return propClassNames;
    },
};
