import { AppUser } from "./app-user.type";

export type Group = {
    id: number;
    name: string;
    description: string;
    users: AppUser[];
};