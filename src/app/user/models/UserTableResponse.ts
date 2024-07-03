import { UserDataResponse } from "./UserDataResponse";

export class UserTableResponse{
    constructor(
        public page:UserDataResponse[],
        public usersCount:number
    ){}
}