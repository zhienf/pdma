import { Package } from "./package";

export class Driver {
    _id: string;
    id: string;
    name: string;
    department: string; 
    licence: string;
    isActive: boolean;
    createdAt: Date;
    assignedPackages: Package[];

    constructor() {
        this._id = '';
        this.id = '';
        this.name = '';
        this.department = '';
        this.licence = '';
        this.isActive = true;
        this.createdAt = new Date(); 
        this.assignedPackages = [];
    }
}