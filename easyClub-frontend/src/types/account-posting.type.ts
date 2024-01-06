import { AppUser } from "./app-user.type";
import { Club } from "./club.type";

export type AccountPosting = {
    id?: number;
    accountDonor: AppUser;
    bookingDate: Date;
    bookingFinishedDate: Date;
    bookingText: string;
    usageText: string;
    donationReceiver: Club;
    iban: string;
    bic: string;
    amount: number;
    type: number;
};