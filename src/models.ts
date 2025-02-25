export interface IEvent {
    id: number;
    name: string;
    description: string;
    pathToImage: string;
    dateOfEvent: string;
}

export interface ICourse {
    id: number;
    name: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    image: string;
}