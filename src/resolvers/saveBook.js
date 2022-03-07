const { AuthenticationError, ApolloError } = require("apollo-server");

const { User } = require("../models");

const saveBook = async (_, { input }, context) => {
  try {
    if (context.user) {
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );

      return user;
    }

    console.log(`[ERROR]: Failed to save book | User not logged in`);
    throw new AuthenticationError("Failed to save book");
  } catch (error) {
    console.log(`[ERROR]: Failed to save book | ${error.message}`);
    throw new ApolloError("Failed to save book");
  }
};

module.exports = saveBook;
