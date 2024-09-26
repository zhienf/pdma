import { ObjectId } from 'mongodb';

export class Driver {
    id: string;
    name: string;
    department: string; 
    licence: string;
    isActive: boolean;
    createdAt: Date;
    assignedPackages: ObjectId[];

    constructor() {
        this.id = '';
        this.name = '';
        this.department = '';
        this.licence = '';
        this.isActive = true;
        this.createdAt = new Date(); 
        this.assignedPackages = [];
    }
}