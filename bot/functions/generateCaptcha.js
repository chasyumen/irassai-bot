// var gmCaptcha = require('gm-captcha');

module.exports = {
    name: "generateCaptcha",
    run: async function (text) {
        return null;
        /* new Promise((resolve, reject) => {
            var options = {
                width: 100,
                height: 50,
                text: text
            }
            var captcha = new gmCaptcha(options);
            var gmObj = captcha.generator(); // return a gm object
            captcha.gmBuffer(gmObj, 'PNG', function (buffer) {
                resolve(buffer);
            });
        });*/
    }
}