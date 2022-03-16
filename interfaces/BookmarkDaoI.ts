import Bookmark from "../models/Bookmark";

export default interface BookmarkDaoI{
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnBookmarksTuit (tid: string, uid: string): Promise<any>;
    userViewsBookmarkList (uid: string): Promise<Bookmark[]>;
    //Custom Below
    viewAllBookmarks(): Promise<Bookmark[]>;
};