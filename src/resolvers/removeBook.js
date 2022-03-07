const { AuthenticationError, ApolloError } = require("apollo-server");

const { User } = require("../models");

const removeBook = async (_, { input }, context) => {
  try {
    if (context.user) {
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: input.bookId } } },
        { new: true }
      );

      return user;
    }

    console.log(`[ERROR]: Failed to remove book | User not logged in`);
    throw new AuthenticationError("Failed to remove book");
  } catch (error) {
    console.log(`[ERROR]: Failed to remove book | ${error.message}`);
    throw new ApolloError("Failed to remove book");
  }
};

module.exports = removeBook;
