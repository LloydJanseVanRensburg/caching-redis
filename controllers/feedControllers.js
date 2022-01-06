const { redisClient } = require('../services/redisClient');
const db = require('../models');

class FeedControllers {
  static getUserFeed = async (req, res, next) => {
    try {
      const { id: userId } = res.locals.user;

      const cachedFeed = await (await redisClient()).hGet(userId, 'feed');

      if (cachedFeed) {
        console.log('CACHED FEED HIT');
        return res.status(200).send({
          count: JSON.parse(cachedFeed).length,
          data: JSON.parse(cachedFeed),
        });
      }

      console.log('CACHED FEED MISS');

      const groupsFollowed = await db.GroupMember.findAll({
        where: {
          UserId: userId,
        },
      });

      const formattedGroupIds = groupsFollowed.map((el) => {
        return el.GroupId;
      });

      const feedPosts = await db.Post.findAll({
        where: {
          GroupId: formattedGroupIds,
        },
        order: [['createdAt', 'DESC']],
      });

      (await redisClient()).hSet(userId, 'feed', JSON.stringify(feedPosts));

      res.status(200).send({
        count: feedPosts.length,
        feedPosts,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  FeedControllers,
};
