const { ApolloError, AuthenticationError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  try {
    const user = await User.findOne({ email: input.email });

    if (!user) {
      console.log(`[ERROR]: Failed to login | User does not exist`);
      throw new AuthenticationError("Failed to login");
    }

    const isValidPassword = await user.isCorrectPassword(input.password);

    if (!isValidPassword) {
      console.log(`[ERROR]: Failed to login | Incorrect password`);
      throw new AuthenticationError("Failed to login");
    }

    return {
      token: signToken(user),
      user,
    };
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);
    throw new ApolloError("Failed to login");
  }
};

module.exports = login;
