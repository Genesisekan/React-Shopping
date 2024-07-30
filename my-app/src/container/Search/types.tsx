export type ResponseType = {
    success: boolean;
    data: Array<{
        id: string;
        name: string;
        openHours: string;
        address: string;
        distance: string;
        latitude: string;
        longitude: string;
    }>;
}