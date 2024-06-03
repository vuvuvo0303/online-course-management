export class User {
    userId: string = "";
    fullName: string = "";
    email: string = "";
    password: string = "";
    avatarUrl: string = "";
    createdDate: string = "";
    updatedDate: string = "";
}

export class Student extends User {
    isActive: boolean = true;
}

export class Admin extends User {
    lastLogin: string = "";
}

export class Instructor extends User {
    description: string ="";
    degree: string ="";
    status: string ="";
}
