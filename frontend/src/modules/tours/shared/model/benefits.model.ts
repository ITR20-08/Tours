export interface IBenefit{
    id:number,
    description:string
}

export interface IBenefitSelect{
    value:string,
    label:string
}

export interface BenefitDetail{
    id: number,
    description: string,
}
export interface Benefit {
    id: number,
    description: string,
    benefit: BenefitDetail
}