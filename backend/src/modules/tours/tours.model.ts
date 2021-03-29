import { ICategory } from '../categories/categories.model'
import { ILocation } from '../locations/locations.model'


export interface ITour {
    id: number,
    name: string,
    description: string,
    duration: number,
    start_date: Date,
    price_for_person: number ,
    max_capacity: number,
    calification: number,
    category: ICategory,
    location: ILocation
}