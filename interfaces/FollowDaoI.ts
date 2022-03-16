import Follow from "../models/Follow";

export default interface LikeDaoI {
    findAllUsersFollowingUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userUnFollowsUser (uidFollowing: string, uidFollower: string): Promise<any>;
    userFollowsUser (uidFollowing: string, uidFollower: string): Promise<Follow>;
};