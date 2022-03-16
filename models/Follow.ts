import User from "./users/User";

/**
 * @file Implements Follow Model
 */

export default interface Follow{
    userFollowed: User,
    userFollowing: User,
};