export class User {
    username: string;
    password: string;
    confirmPassword: string;

    constructor() {
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
    };
}