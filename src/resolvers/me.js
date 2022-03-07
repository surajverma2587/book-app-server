const { AuthenticationError, ApolloError } = require("apollo-server");

const { User } = require("../models");

const me = async (_, __, context) => {
  try {
    if (context.user) {
      const user = await User.findById(context.user._id);

      if (!user) {
        console.log(`[ERROR]: Failed to get user | User does not exist`);
        throw new AuthenticationError("Failed to get user");
      }

      return user;
    }

    console.log(`[ERROR]: Failed to get user | User not logged in`);
    throw new AuthenticationError("Failed to get user");
  } catch (error) {
    console.log(`[ERROR]: Failed to get user | ${error.message}`);
    throw new ApolloError("Failed to get user");
  }
};

module.exports = me;
