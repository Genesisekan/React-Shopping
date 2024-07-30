//location type information
export type LocationType = {
    id: string;
    address: string;
}

//banner sliding type information
export type BannersType = Array<{
    id: string;
    imgUrl: string;
}>

export type CategoriesType = Array<{
    id: string;
    name: string;
    imgUrl: string;
}>;

export type FreshesType = Array<{
    id: string;
    name: string;
    imgUrl: string;
    price: string;
}>;


export type ResponseType = {
    success: boolean;
    data: {
        location: LocationType;
        banners: BannersType;
        categories: CategoriesType;
        freshes: FreshesType;
    }
}