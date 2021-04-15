import { Category } from '../model/category.model'
import { Benefit } from '../model/benefit.model'
import { Location } from '../model/location.model'

export interface Tour {
    id: string,
    name?: string,
    description?: string,
    duration?: number,
    start_date: string,
    price_for_person?: number,
    max_capacity?: number,
    calification?: number,
    category?: Category,
    location: Location,
    benefits?: Benefit[]
}
