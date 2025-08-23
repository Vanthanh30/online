const accountRoute = require("./user.js");
const systemConfig = require("../../configs/system.js");

module.exports = (app) => {
    app.use(systemConfig.prefixApi + "/admin/users", accountRoute);

};
