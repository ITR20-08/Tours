import { IUser } from '../model/user.model'

export interface Review {
    id: number,
    description: string,
    calification:  number,
    user: IUser
}