import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @file Implements Like Model
 */

export default interface Like {
    tuit: Tuit,
    likedBy: User
};