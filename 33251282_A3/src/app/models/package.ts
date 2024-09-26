import { ObjectId } from 'mongodb';

export class Package {
    id: string;
    title: string;
    weight: number;
    destination: string;
    description: string;
    createdAt: Date;
    isAllocated: boolean;
    driverId: ObjectId;

    constructor() {
        this.id = '';
        this.title = '';
        this.weight = 0;
        this.destination = '';
        this.description = '';
        this.createdAt = new Date();
        this.isAllocated = true;
        this.driverId = new ObjectId('');
    }
}