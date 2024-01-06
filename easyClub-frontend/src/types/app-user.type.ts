import { Group } from "./group-type";
import { Role } from "./role.type";

export type AppUser = {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    phoneNumber: string;
    mobileNumber: string;
    street: string;
    housenumber: string;
    city: string;
    postCode: string;
    picture: Uint8Array | null;
    customPassword: boolean;
    locked: boolean;
    groups: Group[];
    roles: Role[];
};