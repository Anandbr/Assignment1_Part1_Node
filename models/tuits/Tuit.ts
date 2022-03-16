import User from "../users/User";

/**
 * @file Implement Tuit Model
 */

export default interface Tuit{
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String
}