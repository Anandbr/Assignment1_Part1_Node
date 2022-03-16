/**
 * @file Controller RESTful Web service for Follows Resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import Follow from "../models/Follow";
import FollowControllerI from "../interfaces/FollowControllerI";
/**
 * @class FollowController Implements RESTful Web service API for Follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uidFollowing/followers to retrieve all the users following a user
 *     </li>
 *     <li>GET /api/users/:uidFollower/following to retrieve all users followed by a user
 *     </li>
 *     <li>POST /api/users/:uidFollowing/follows/:uidFollower to record that a user followed a user
 *     </li>
 *     <li>DELETE /api/users/:uidFollowing/follows/:uidFollower to record that a user
 *     no longer follows a user</li>
 *     <li>GET /api/follows to retrieve all follows </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uidFollowing/followers",
                FollowController.followController.findAllUsersFollowingUser);
            app.get("/api/users/:uidFollower/following",
                FollowController.followController.findAllUsersFollowedByUser);
            app.delete("/api/users/:uidFollowing/follows/:uidFollower",
                FollowController.followController.userUnFollowsUser);
            app.post("/api/users/:uidFollowing/follows/:uidFollower",
                FollowController.followController.userFollowsUser);
            //Custom One
            app.get("/api/follows", FollowController.followController.findAllFollows);
        }

        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users that are following a user
     * @param {Request} req Represents request from client, including the path
     * parameter uidFollowing representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowingUser
        (req.params.uidFollowing)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that are followed by user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser
        (req.params.uidFollower)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uidFollowing and uidFollower representing the followed and the following
     * users respectively
     * @param {Response} res Represents response to client, including the
     * status marking if the User was successfully unfollowed.
     */
    userUnFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsUser
        (req.params.uidFollowing, req.params.uidFollower)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uidFollowing and uidFollower representing the followed and the following
     * users respectively
     * @param {Response} res Represents response to client, including the
     * body formatted as a JSON array containing the follow object
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser
        (req.params.uidFollowing, req.params.uidFollower)
            .then(follows => res.json(follows));
    /**
     * Retrieves all follows from a database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the follows objects
     */
    findAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollows()
            .then(follows =>res.json(follows));

}