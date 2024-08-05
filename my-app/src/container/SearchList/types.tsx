export type ResponseType = {
    success: boolean;
    data: Array<{
        id: string;
        imgUrl: string;
        title: string;
        price: string;
        sales: string;
    }>;
}
