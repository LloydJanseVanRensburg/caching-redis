require('dotenv').config();
const db = require('../models');
const faker = require('faker');
const bcrypt = require('bcryptjs');

const createNewUser = async () => {
  const username = faker.internet.userName();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const profileImageKey = faker.image.image();
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await db.User.create({
    username,
    firstName,
    lastName,
    password: hashedPassword,
    profileImageKey,
  });

  console.log('Created new user');

  return newUser;
};

(() => {
  createNewUser().then(() => {
    process.exit();
  });
})();
