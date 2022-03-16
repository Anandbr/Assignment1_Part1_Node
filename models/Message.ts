import User from "./users/User";

/**
 * @file Implements Message Model
 */

export default interface Message{
    message: string,
    to: User,
    from: User,
    sentOn?: Date
};