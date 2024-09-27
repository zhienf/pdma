export class Driver {
    id: string;
    name: string;
    department: string; 
    licence: string;
    isActive: boolean;
    createdAt: Date;
    assignedPackages: string[];

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