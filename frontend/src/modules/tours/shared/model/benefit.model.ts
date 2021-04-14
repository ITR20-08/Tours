export interface BenefitDetail{
    id: number,
    description: string,
}
export interface Benefit {
    id: number,
    description: string,
    benefit: BenefitDetail
}
