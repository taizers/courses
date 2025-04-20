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
    pathToImage: string;
    tutorUsername: string;
}

export interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    role: string;
    isActive: boolean;
    image: string;
    pathToImage: string;
}

export interface ITutor {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    age: number;
    isActive: boolean;
    image: string;
    pathToImage: string;
}

export interface ITutorShort {
    username: string;
    firstName: string;
    lastName: string;
}
