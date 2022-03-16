/**
 * @file Implements DAO managing data storage of users. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI{
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null){
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}
    /**
     * Inserts bookmarks instance into the database
     * @param {User} user Instance to be inserted into the database
     * @param {Tuit} tuit instance to be inserted into the database
     * @returns Promise To be notified when Bookmarks is inserted into the database
     */
    userBookmarksTuit =
        async (uid: string, tid: string): Promise<Bookmark> =>
            BookmarkModel
                .create({bookmarkedTuit: tid, bookmarkedBy: uid});
    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of user bookmarked to be removed
     * @param {string} tid Primary key of tuit bookmarked to be removed
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnBookmarksTuit =
        async (uid: string, tid: string): Promise<any> =>
            BookmarkModel
                .deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Uses BookmarkModel to retrieve user's bookmarked tuits from bookmark collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmarks are retrieved from the database
     */
    userViewsBookmarkList =
        async (uid: string): Promise<Bookmark[]> =>
            BookmarkModel
                .find({bookmarkedBy: uid})
                .populate("bookmarkedTuit")
                .exec();

    /**
     * View all Bookmarks from the database. Useful for testing
     * @returns Promise to be notified when bookmarks
     * are retrieved from database
     */
    viewAllBookmarks =
        async(): Promise<Bookmark[]> =>
            BookmarkModel
                .find();
};