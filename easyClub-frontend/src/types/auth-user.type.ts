import { Role } from "./role.type";

/* export type AuthUser = {
    id?: number;
    birthdate: Date;
    city: string;
    email: string;
    firstname: string;
    housenumber: string;
    lastname: string;
    mobilenumber: string;
    passwordChanged: boolean;
    phonenumber: string;
    picture: any;
    postCode: string;
    roles: Role[];
    street: string;
    token: string;
    username: string;
}; */

export type AuthUser = {
    token: string;
    type: string;
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    street: string;
    housenumber: string;
    postCode: string;
    city: string;
    email: string;
    phonenumber: string;
    mobilenumber: string;
    roles: string[];
    passwordChanged: boolean;
    picture: string | null;
};