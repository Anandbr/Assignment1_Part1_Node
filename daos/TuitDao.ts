/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = () =>{
        if(TuitDao.tuitDao == null){
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    private constructor(){}

    /**
     * Uses TuitModel to retrieve single user document from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve single user document from users collection
     * @param {string} tid tuits's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            /* populate with a string */
            .populate("postedBy")
            .exec();
    /**
     * Inserts tuit instance into the database
     * @param {User} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuitByUser(uid: string, tuit: Tuit): Promise<any>{
        return await TuitModel.create(tuit);
    }
    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {User} tuit User object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});
    /**
     * Removes targetted tuit from database.
     * @returns Promise To be notified when tuit is removed from the
     * database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .deleteOne()
}