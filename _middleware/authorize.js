const { expressjwt } = require("express-jwt"); // Option 1: Destructuring import
// const expressjwt = require("express-jwt"); // Option 2: Default import

const { secret } = require("config.json");
const db = require("_helpers/db");

module.exports = authorize;

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    expressjwt({ secret, algorithms: ["HS256"] }),

    async (req, res, next) => {
      const account = await db.Account.findByPk(req.user.id);

      if (!account || (roles.length && !roles.includes(account.role))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user.role = account.role;
      const refreshTokens = await account.refreshTokens();

      req.user.ownsToken = (token) =>
        !!refreshTokens.find((x) => x.token === token);
      next();
    },
  ];
}
