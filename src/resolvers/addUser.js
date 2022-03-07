const { ApolloError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const addUser = async (_, { input }, context) => {
  try {
    const user = await User.create(input);

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to add user | ${error.message}`);
    throw new ApolloError("Failed to add user");
  }
};

module.exports = addUser;
