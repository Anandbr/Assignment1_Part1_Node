/**
 * @file Controller RESTful Web service for Messages Resource
 */
import {Request, Response, Express} from "express";
import Message from "../models/Message";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uidFrom/sender to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uidTo/receiver to retrieve all messages that a user received
 *     </li>
 *     <li>POST /api/messages to record that a sent a message to another user
 *     </li>
 *     <li>DELETE /api/messages/:messageID to record that a user
 *     deleted a message</li>
 *     <li>GET /api/messages to retrieve all the messages </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/messages",
                MessageController.messageController.userSendsMessage);
            app.delete("/api/messages/:messageID",
                MessageController.messageController.userDeletesMessage);
            app.get("/api/users/:uidTo/receiver",
                MessageController.messageController.userViewsReceivedMessages);
            app.get("/api/users/:uidFrom/sender",
                MessageController.messageController.userViewsSentMessages);
            //Custom Function
            app.get("/api/messages",
                MessageController.messageController.findAllMessages);
        }
        return MessageController.messageController;
    }
    private constructor() {}
    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uidTo and uidFrom representing sending and receiving
     * users respectively and the body of the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the message object
     */
    userSendsMessage = (req: Request, res: Response) => {
        console.log(req.body);
        MessageController.messageDao.userSendsMessage
        (req.body, req.params.uidTo, req.params.uidFrom)
            .then(message => res.json(message));
    }

    /**
     * Retrieves from database all messages User received
     * @param {Request} req Represents request from client, including the path
     * parameter messageID that represents the target message
     * @param {Response} res Represents response to client, including the
     * response to mark if the message was deleted successfully or not.
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage
        (req.params.messageID)
            .then(status => res.json(status));

    /**
     * Retrieves from database all messages User sent
     * @param {Request} req Represents request from client, including the path
     * parameter uidFrom that represents the User who sent the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    userViewsSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsSentMessages
        (req.params.uidFrom)
            .then((messages:Message[]) => res.json(messages));
    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uidTo representing the User who received the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    userViewsReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsReceivedMessages
        (req.params.uidTo)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the messages objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then(messages => res.json(messages));
}