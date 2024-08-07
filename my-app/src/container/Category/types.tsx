export type CategoriesTagsResponseType = {
    success: boolean;
    data: {
        category: Array<{
            id: string;
            name: string;
        }>;
        tag: Array<string>;
    };
}

export type ProductsType = {
        id: string;
        imgUrl: string;
        title: string;
        price: string;
        sales: number;
};

export type ProductsResponseType = {
    success: boolean;
    data:  Array<ProductsType>;

}

export type CartType = {
    id: string;
    imgUrl: string;
    title: string;
    price: string;
    count: number;
};

export type CartResponseType = {
    success: boolean;
    data:  CartType;

}