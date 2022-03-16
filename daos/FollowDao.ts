/**
 * @file Implements DAO managing data storage of users. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to retrieve users following from follows collection
     * @param {string} to Followed User's primary key
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllUsersFollowingUser =
        async (uid: string): Promise<Follow[]> =>
            FollowModel
                .find({userFollowed: uid})
                .populate("userFollowing")
                .exec();
    /**
     * Uses FollowModel to retrieve users followed from follows collection
     * @param {string} to Following User's primary key
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllUsersFollowedByUser =
        async (uid: string): Promise<Follow[]> =>
            FollowModel
                .find({userFollowing:uid})
                .populate("userFollowed")
                .exec();

    /**
     * Inserts Follows instance into the database
     * @param {UserFollowing} user Instance to be inserted into the database
     * @param {UserFollowed} user Instance to be inserted into the databse
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser =
        async (uidFollowing: string, uidFollower: string): Promise<Follow> =>
            FollowModel
                .create({userFollowed: uidFollowing, userFollowing: uidFollower});
    /**
     * Removes follow from the database.
     * @param {string} uidFollowing Primary key of user following to be removed
     * @param {string} uidFollower Primary key of tuit follower to be removed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnFollowsUser =
        async (uidFollowing: string, uidFollower: string): Promise<any> =>
            FollowModel
                .deleteOne({userFollowed: uidFollowing, userFollowing: uidFollower});

    /**
     * View all Follows from the database. Useful for testing
     * @returns Promise to be notified when follows
     * are retrieved from database
     */
    findAllFollows =
        async (): Promise<Follow[]> =>
            FollowModel.find();

}