export interface Comment  {
    _id?:string,
    content:string,
    user?:{_id:string,username:string}
}