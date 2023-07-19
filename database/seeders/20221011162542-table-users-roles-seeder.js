import { hash } from 'bcrypt';

module.exports = {
  async up(queryInterface, Sequelize) {
    let password = await hash('mavenmobile', 10);

    let roles = [
      { name: 'Backend Developer' },
      { name: 'Frontend Developer' },
      { name: 'Mobile Developer' },
      { name: 'DevOps' },
    ];

    let users = [
      {
        name: 'Asmari',
        role_id: 1,
        email: 'asmari@merkleinnovation.com',
        password,
      },
      {
        name: 'Hartanto N.Cendana',
        role_id: 1,
        email: 'toto@merkleinnovation.com',
        password,
      },
      {
        name: 'Rudiyanto',
        role_id: 1,
        email: 'rudi@merkleinnovation.com',
        password,
      },
      {
        name: 'Dyah Nuraeni',
        role_id: 1,
        email: 'dyah@merkleinnovation.com',
        password,
      },
      {
        name: 'Sahat L Batu',
        role_id: 1,
        email: 'sahat@merkleinnovation.com',
        password,
      },
      {
        name: 'Handy',
        role_id: 1,
        email: 'handy@merkleinnovation.com',
        password,
      },
      {
        name: 'Shanina',
        role_id: 1,
        email: 'shanina@merkleinnovation.com',
        password,
      },
      {
        name: 'Davina',
        role_id: 1,
        email: 'davina@merkleinnovation.com',
        password,
      },
      {
        name: 'Amir Faisal Zamzami',
        role_id: 2,
        email: 'amir@merkleinnovation.com',
        password,
      },
      {
        name: 'Reza Erlin',
        role_id: 2,
        email: 'reza@merkleinnovation.com',
        password,
      },
      {
        name: 'Grand Marcell',
        role_id: 2,
        email: 'grand@merkleinnovation.com',
        password,
      },
      {
        name: 'Andre Feri',
        role_id: 2,
        email: 'andre@merkleinnovation.com',
        password,
      },
      {
        name: 'Ilham Malik M',
        role_id: 3,
        email: 'malik@merkleinnovation.com',
        password,
      },
      {
        name: 'Octavian Wisnu W',
        role_id: 3,
        email: 'wisnu@merkleinnovation.com',
        password,
      },
      {
        name: 'Shidqi Akram Hauzan',
        role_id: 3,
        email: 'shidqi@merkleinnovation.com',
        password,
      },
      {
        name: 'Arie Budiman',
        role_id: 4,
        email: 'arie@merkleinnovation.com',
        password,
      },
      {
        name: 'Viktory Hendrico',
        role_id: 4,
        email: 'viktor@merkleinnovation.com',
        password,
      },
      {
        name: 'Yusril Muhammad',
        role_id: 4,
        email: 'yusril@merkleinnovation.com',
        password,
      },
      {
        name: 'Akhyar',
        role_id: 4,
        email: 'akhyar@merkleinnovation.com',
        password,
      },
    ];

    await queryInterface.bulkInsert('roles', roles, {});
    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};
