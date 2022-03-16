import {Request, Response} from "express";

export default interface BookmarkControllerI{
    userBookmarksTuit (req: Request, res: Response): void;
    userUnBookmarksTuit (req: Request, res: Response): void;
    userViewsBookmarkList (req: Request, res: Response): void;
    //Custom Below
    viewAllBookmarks (req: Request, res: Response): void;
}