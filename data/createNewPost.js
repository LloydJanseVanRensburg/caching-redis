require('dotenv').config();
const db = require('../models');
const faker = require('faker');

const createNewPost = async () => {
  try {
    const groupMembers = await db.GroupMember.findAll();
    const randomIdx = Math.floor(Math.random() * groupMembers.length);
    const randomGroupMember = groupMembers[randomIdx];

    const postContent = {
      title: faker.name.title(),
      body: faker.lorem.sentences(),
      image: faker.image.image(),
    };

    const newPost = await db.Post.create({
      content: postContent,
      UserId: randomGroupMember.UserId,
      GroupId: randomGroupMember.GroupId,
    });

    console.log('New Post Created');

    return newPost;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '--number') {
  if (typeof Number(process.argv[3]) === 'number') {
    const counter = Number(process.argv[3]);

    for (let i = 0; i < counter; i++) {
      createNewPost();
    }
  }
}
