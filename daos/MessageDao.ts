/**
 * @file Implements DAO managing data storage of users. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null){
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    /**
     * Inserts message instance into the database
     * @param {message} message Instance to be inserted into the database
     * @param{toID} User instance to be inserted into the database
     * @param{fromID} User instance to be inserted into the database
     * @returns Promise To be notified when Message is inserted into the database
     */
    userSendsMessage =
        async(message: Message, toID: string, fromID: string): Promise<Message> =>
            MessageModel
                .create(message);
    /**
     * Removes message from the database.
     * @param {string} messageID Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage =
        async(messageID: string): Promise<any> =>
            MessageModel
                .findById(messageID)
                .deleteOne();

    /**
     * Uses MessageModel to retrieve sent messages from messages collection
     * @param {string} to Sending User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    userViewsSentMessages =
        async(from: string): Promise<Message[]> =>
            MessageModel
                .find({from: from})
                .populate("from")
                .exec();

    /**
     * Uses MessageModel to retrieve received messages from messages collection
     * @param {string} to Recieving User's primary key
     * @returns Promise To be notified when messages are retrieved from the database
     */
    userViewsReceivedMessages =
        async(to: string): Promise<Message[]> =>
            MessageModel
                .find({to: to})
                .populate("to")
                .exec();

    /**
     * View all Messages from the database. Useful for testing
     * @returns Promise to be notified when messages
     * are retrieved from database
     */
    async findAllMessages(): Promise<Message[]> {
        return await MessageModel.find();
    }

}