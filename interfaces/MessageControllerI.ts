import {Request, Response} from "express";

export default interface MessageControllerI{
    userSendsMessage (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    userViewsSentMessages (req: Request, res: Response): void;
    userViewsReceivedMessages (req: Request, res: Response): void;
};