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
    tutorUsername: string;
}

export interface ITutor {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    phone: string;
    age: number;
    isActive: number;
    image: string;
}

export interface ITutorShort {
    username: string;
    firstname: string;
    lastname: string;
}
