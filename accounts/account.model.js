const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allownull: false },
    passwordHash: { type: DataTypes.STRING, allownull: false },
    title: { type: DataTypes.STRING, allownull: false },
    firstName: { type: DataTypes.STRING, allownull: false },
    lastName: { type: DataTypes.STRING, allownull: false },
    acceptTerms: { type: DataTypes.BOOLEAN },
    role: { type: DataTypes.STRING, allownull: false },
    verificationToken: { type: DataTypes.STRING },
    verified: { type: DataTypes.DATE },
    resetToken: { type: DataTypes.STRING },
    resetTokenExpires: { type: DataTypes.DATE },
    passwordReset: { type: DataTypes.DATE },
    created: {
      type: DataTypes.DATE,
      allownull: false,
      defaulValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
    },
    isVerified: {
      type: DataTypes.VIRTUAL,
      get() {
        return !!(this.verified || this.passwordReset);
      },
    },
  };

  const options = {
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("account", attributes, options);
}
