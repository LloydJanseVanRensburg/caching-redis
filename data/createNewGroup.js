require('dotenv').config();
const db = require('../models');
const faker = require('faker');
const { createNewGroupMember } = require('./createNewGroupMember');

const createNewGroup = async (userId) => {
  try {
    const name = faker.internet.domainName();
    const description = faker.lorem.sentences();
    const image = faker.image.image();

    const newGroup = await db.Group.create({
      name,
      description,
      image,
      UserId: userId,
    });

    console.log('Create new group');

    return newGroup;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

(async () => {
  const users = await db.User.findAll();
  const totalUsers = users.length;
  const randomIdx = Math.floor(Math.random() * totalUsers);
  const randomUser = users[randomIdx];

  const newGroup = await createNewGroup(randomUser.id);
  await createNewGroupMember(newGroup.id, newGroup.UserId);

  process.exit();
})();
