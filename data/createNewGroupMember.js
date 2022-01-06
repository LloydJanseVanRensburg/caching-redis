require('dotenv').config();
const db = require('../models');

const createNewGroupMember = async (groupId, userId) => {
  try {
    const newGroupMember = await db.GroupMember.create({
      GroupId: groupId,
      UserId: userId,
    });

    console.log('Create new member');

    return newGroupMember;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '--userId' && process.argv[4] === '--groupId') {
  if (process.argv[3] && process.argv[5]) {
    const userId = process.argv[3];
    const groupId = process.argv[5];
    createNewGroupMember(groupId, userId).then(() => {
      process.exit();
    });
  }
}

module.exports = {
  createNewGroupMember,
};
