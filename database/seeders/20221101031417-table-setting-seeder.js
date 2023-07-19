module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        name: 'is_maintenance',
        value: false,
        type: 'BOOLEAN',
      },
      {
        name: 'app_version',
        value: '1.0.0',
        type: 'STRING',
      },
    ];
    await queryInterface.bulkInsert('settings', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings', null, {});
  },
};
