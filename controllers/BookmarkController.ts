/**
 * @file Controller RESTful Web service for Bookmarks Resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/bookmarks to retrieve all the bookmarks
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all tuits that user bookmarked
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record that a user
 *     no longer bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI{
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController =>{
        if(BookmarkController.bookmarkController === null){
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userUnBookmarksTuit);
            app.get("/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.userViewsBookmarkList);
            app.get("/api/bookmarks",
                BookmarkController.bookmarkController.viewAllBookmarks);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit and uid represent bookmarking user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark object
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit
        (req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    /**
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit and uid representing unbookmarking user
     * @param {Response} res Represents response to client, including the
     * status on whether bookmark was deleted successfully or not
     */
    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnBookmarksTuit
        (req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Retrieves all tuits that user bookmarked
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the bookmarking user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    userViewsBookmarkList = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userViewsBookmarkList(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
    /**
     * Retrieves all bookmarks
     * @param {Request} req Represent request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    viewAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.viewAllBookmarks()
            .then(bookmarks => res.json(bookmarks));
}