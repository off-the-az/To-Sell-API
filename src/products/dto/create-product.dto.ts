export class CreateProductDto {
    id: number;
    name: string;
    description: string;
    priceOld: number;
    priceNew: number;
    shopId: number;
    categoryId: number;
}
