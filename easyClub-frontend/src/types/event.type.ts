export type Event = {
    id: number | undefined;
    name: string;
    category: string;
    location: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    description: string;
    color: string;
    allday: boolean;
};