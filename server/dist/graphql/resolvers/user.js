import { forgetPassword, Login, registerUser, resetPasswordByToken, updatePassword, UpdateUserNameEmail, uploadAvator } from "../../controller/user.js";
export const userResolvers = {
    Query: {
        currentUser: async (_, __, { user }) => {
            return user;
        },
        logout: async (_, __, { res }) => {
            res.cookie("token", null, { maxAge: 0 });
            return true;
        }
    },
    Mutation: {
        register: async (_, { userInput }) => {
            return await registerUser(userInput);
        },
        login: async (_, { userInput }, { res }) => await Login(userInput, res),
        uploadAvatar: async (_, { image }, { userId }) => await uploadAvator(image, userId),
        updateProfile: async (_, { profileInput }, { userId }) => await UpdateUserNameEmail(profileInput, userId),
        updatePassword: async (_, { oldPassword, newPassword }, { userId }) => await updatePassword(oldPassword, newPassword, userId),
        forgetPassword: async (_, { customerEmail }) => await forgetPassword(customerEmail),
        resetPassword: async (_, { token, newPassword }) => await resetPasswordByToken(token, newPassword)
    }
};
