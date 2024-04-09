const { testLogin } = require("../commands/LoadLoginPage");


async function artilleryScript(page) {

    await testLogin(page);

}

module.exports = {
    artilleryScript
};