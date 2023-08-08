"use strict";

const { db, Sequelize } = require("./db");

// Require your models and make your associations

const WizardingSchools = db.define("wizardingschools", {
  
  name: {
    type: Sequelize.STRING,
  },
  
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://i.ibb.co/30JYJkB/hogwarts.webp",
  },
 
  address: {
    type: Sequelize.STRING,
  },

  description:{
    type: Sequelize.STRING(1000),
  },

});

const Students = db.define("students", {
  
  firstName: {
    type: Sequelize.STRING,
  },

  lastName: {
    type: Sequelize.STRING,
  },

  email: {
    type: Sequelize.STRING,
  },
  
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://i.ibb.co/30JYJkB/hogwarts.webp",
  },
 
  magicalAbilityScore: {
    type: Sequelize.FLOAT
  },

});

WizardingSchools.hasMany(Students);
Students.belongsTo(WizardingSchools);


module.exports = {
  db,
  WizardingSchools,
  Students,
};
