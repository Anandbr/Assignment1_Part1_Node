import Tuit from "./tuits/Tuit";
import User from "./users/User";

/**
 * @file Implements Bookmark Model
 */

export default interface Bookmark{
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
}