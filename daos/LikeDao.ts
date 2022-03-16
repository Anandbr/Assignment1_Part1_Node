/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI{
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Uses LikeModel to retrieve all users who liked tuit from likes collection
     * @param {string} tid tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatLikedTuit =
        async (tid: string): Promise<Like[]> =>
            LikeModel
                .find({tuit: tid})
                .populate("likedBy")
                .exec();
    /**
     * Uses likeModel to retrieve liked tuits by user from likes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when likes are retrieved from the database
     */
    findAllTuitsLikedByUser =
        async (uid: string): Promise<Like[]> =>
            LikeModel
                .find({likedBy: uid})
                .populate("tuit")
                .exec();
    /**
     * Inserts like instance into the database
     * @param {User} like Instance to be inserted into the database
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit =
        async (uid: string, tid: string): Promise<any> =>
            LikeModel
                .create({tuit: tid, likedBy: uid});
    /**
     * Removes like from the database.
     * @returns Promise To be notified when like is removed from the
     * database
     */
    userUnlikesTuit =
        async (uid: string, tid: string): Promise<any> =>
            LikeModel
                .deleteOne({tuit: tid, likedBy: uid});
}