'use strict';
const bcrypt = require('bcrypt');

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const passwprdHash = await bcrypt.hash(password, salt);  

  return passwprdHash;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users', [{
     name: 'Arifia Kasastra R',
     username: 'thearka',
     password: await hash('12345678', 10)
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null);
  }
};
