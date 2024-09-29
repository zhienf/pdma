import { Driver } from "./driver";

export class Package {
    _id: string;
    id: string;
    title: string;
    weight: number;
    destination: string;
    description: string;
    createdAt: Date;
    isAllocated: boolean;
    driverId: Driver;

    constructor() {
        this._id = '';
        this.id = '';
        this.title = '';
        this.weight = 0;
        this.destination = '';
        this.description = '';
        this.createdAt = new Date();
        this.isAllocated = true;
        this.driverId = new Driver();
    }
}