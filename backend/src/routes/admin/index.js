const accountRoute = require("./user.js");
const systemConfig = require("../../configs/system.js");
const authRoute = require("./auth.js");
const categoryRoute = require("./category.js")

module.exports = (app) => {
    app.use(systemConfig.prefixApi + "/admin/users", accountRoute);
    app.use(systemConfig.prefixApi + "/admin/auth", authRoute);
    app.use(systemConfig.prefixApi + "/admin/categories", categoryRoute);
};
