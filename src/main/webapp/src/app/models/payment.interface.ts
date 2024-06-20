import { Supply } from "./supply.interface";

export interface Payment {
    id: number;
    createdAt: Date;
    total: string;
    supply: Supply;
    description: string;
    file: any;
    fileType: string;
}