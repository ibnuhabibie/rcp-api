module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        name: 'Exedy Forum',
        pic: 'Yuri',
      },
      {
        name: 'HCA',
        pic: 'Yuri',
      },
      {
        name: 'Nobi Compro',
        pic: 'Yuri',
      },
      {
        name: 'VinGeek',
        pic: 'Yuri',
      },
      {
        name: 'TAN',
        pic: 'Ajeng',
      },
      {
        name: 'Seraphim',
        pic: 'Ajeng',
      },
    ];
    await queryInterface.bulkInsert('projects', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
