export class User {
    userId: string;
    fullName: string;
    email: string;
    password: string;
    avatarUrl: string;
    createdDate: string;
    updatedDate: string;

    constructor(
        userId: string = "",
        fullName: string = "",
        email: string = "",
        password: string = "",
        avatarUrl: string = "",
        createdDate: string = "",
        updatedDate: string = ""
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.avatarUrl = avatarUrl;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}

export class Student extends User {
    isActive: boolean;

    constructor(
        userId: string = "",
        fullName: string = "",
        email: string = "",
        password: string = "",
        avatarUrl: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        isActive: boolean = true
    ) {
        super(userId, fullName, email, password, avatarUrl, createdDate, updatedDate);
        this.isActive = isActive;
    }
}

export class Admin extends User {
    lastLogin: string;

    constructor(
        userId: string = "",
        fullName: string = "",
        email: string = "",
        password: string = "",
        avatarUrl: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        lastLogin: string = ""
    ) {
        super(userId, fullName, email, password, avatarUrl, createdDate, updatedDate);
        this.lastLogin = lastLogin;
    }
}

export class Instructor extends User {
    description: string;
    degree: string;
    status: string;

    constructor(
        userId: string = "",
        fullName: string = "",
        email: string = "",
        password: string = "",
        avatarUrl: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        description: string = "",
        degree: string = "",
        status: string = ""
    ) {
        super(userId, fullName, email, password, avatarUrl, createdDate, updatedDate);
        this.description = description;
        this.degree = degree;
        this.status = status;
    }
}
