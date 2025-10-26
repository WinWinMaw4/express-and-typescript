"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contacts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: false, // AU or MM
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false, // Brisbane / Yangon
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true, // QLD
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false, // Australia / Myanmar
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("contacts");
  },
};
