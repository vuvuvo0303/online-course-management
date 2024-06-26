export class User {
  userId: string;
  fullName: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdDate: string;
  updatedDate: string;
  role: string;
  status: boolean;

  constructor(
    userId: string = "",
    fullName: string = "",
    email: string = "",
    password: string = "",
    avatarUrl: string = "",
    createdDate: string = "",
    updatedDate: string = "",
    role: string = "",
    status: boolean = false
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.role = role;
    this.status = status;
  }
}

export class Student extends User {
  constructor(
    userId: string = "",
    fullName: string = "",
    email: string = "",
    password: string = "",
    avatarUrl: string = "",
    createdDate: string = "",
    updatedDate: string = "",
    role: string = "Student",
    status: boolean = false
  ) {
    super(
      userId,
      fullName,
      email,
      password,
      avatarUrl,
      createdDate,
      updatedDate,
      role,
      status
    );
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
    role: string = "Admin",
    lastLogin: string = ""
  ) {
    super(
      userId,
      fullName,
      email,
      password,
      avatarUrl,
      createdDate,
      updatedDate,
      role
    );
    this.lastLogin = lastLogin;
  }
}

export class Instructor extends User {
  description: string;
  degree: string;

  constructor(
    userId: string = "",
    fullName: string = "",
    email: string = "",
    password: string = "",
    avatarUrl: string = "",
    createdDate: string = "",
    updatedDate: string = "",
    role: string = "Instructor",
    status: boolean = false,
    description: string = "",
    degree: string = ""
  ) {
    super(
      userId,
      fullName,
      email,
      password,
      avatarUrl,
      createdDate,
      updatedDate,
      role,
      status
    );
    this.description = description;
    this.degree = degree;
  }
}
