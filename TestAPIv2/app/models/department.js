"use strict";

module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "department",
    {
      department_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      department_name: {
        type: Sequelize.STRING,
        required: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      underscored: true,
    }
  );
  return Department;
};
