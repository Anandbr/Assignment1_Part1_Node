import {Request, Response} from "express";
import Follow from "../models/Follow";

export default interface FollowControllerI {
    findAllUsersFollowingUser (req: Request, res: Response): void;
    findAllUsersFollowedByUser (req: Request, res: Response): void;
    userUnFollowsUser (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
};