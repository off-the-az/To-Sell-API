export class CreateProductDto {
    name: string;
    description: string;
    priceOld: number;
    priceNew: number;
    shopId: number;
    categoryId: number;
}
