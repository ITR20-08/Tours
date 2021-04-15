import { IUserReview } from '../model/user.model'

export interface Review {
    id: number,
    description: string,
    calification:  number,
    user: IUserReview
}