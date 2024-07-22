export type UserRole = "admin" | "instructor" | "student";

export class User {
  _id: string;
  
  google_id?: string;
  name: string;
  email: string; // unique
  password?: string; // required if google_id is null or empty
  role: UserRole;
  status: boolean; // default is true, set false if want disabled user status
  phone_number?: string;
  description?: string; // required if user role is instructor
  avatar: { file?: { originFileObj?: File } } | string;
  video?: string; // url
  dob?: Date; // date of birth
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean; // flag remove logic when user is deleted
  is_verified?: boolean; // add this property

  constructor(
    _id: string = "",
    name: string = "",
    email: string = "",
    role: UserRole = "student",
    status: boolean = true,
    google_id?: string,
    password?: string,
    phone_number?: string,
    description?: string,
    avatar?: { file?: { originFileObj?: File } } | string,
    video?: string,
    dob?: Date,
    created_at?: Date,
    updated_at?: Date,
    is_deleted?: boolean,
    is_verified?: boolean // add this parameter
  ) {
    this._id = _id;
    this.google_id = google_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;
    this.phone_number = phone_number;
    this.description = description;
    this.avatar = avatar || "";
    this.video = video;
    this.dob = dob;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.is_deleted = is_deleted;
    this.is_verified = is_verified; // add this initialization
  }
}

export class Student extends User {
  file?: {
    originFileObj: File;
  };

  constructor(
    _id: string = "",
    name: string = "",
    email: string = "",
    role: UserRole = "student",
    status: boolean = true,
    google_id?: string,
    password?: string,
    phone_number?: string,
    description?: string,
    avatar?: string,
    video?: string,
    dob?: Date,
    created_at?: Date,
    updated_at?: Date,
    is_deleted?: boolean,
    is_verified?: boolean, // add this parameter
    file?: {
      originFileObj: File;
    }
  ) {
    super(
      _id,
      name,
      email,
      role,
      status,
      google_id,
      password,
      phone_number,
      description,
      avatar,
      video,
      dob,
      created_at,
      updated_at,
      is_deleted,
      is_verified // add this parameter to super
    );
    this.file = file;
  }
}

export class Admin extends User {
  lastLogin: string;

  constructor(
    _id: string = "",
    name: string = "",
    email: string = "",
    role: UserRole = "admin",
    status: boolean = true,
    lastLogin: string = "",
    google_id?: string,
    password?: string,
    phone_number?: string,
    description?: string,
    avatar?: string,
    video?: string,
    dob?: Date,
    created_at?: Date,
    updated_at?: Date,
    is_deleted?: boolean,
    is_verified?: boolean // add this parameter
  ) {
    super(
      _id,
      name,
      email,
      role,
      status,
      google_id,
      password,
      phone_number,
      description,
      avatar,
      video,
      dob,
      created_at,
      updated_at,
      is_deleted,
      is_verified // add this parameter to super
    );
    this.lastLogin = lastLogin;
  }
}

export class Instructor extends User {
  description: string;
  degree: string;
  isApproved?: boolean;
  is_subscribed?: boolean
  constructor(
    _id: string = "",
    name: string = "",
    email: string = "",
    role: UserRole = "instructor",
    status: boolean = true,
    description: string = "",
    degree: string = "",
    google_id?: string,
    password?: string,
    phone_number?: string,
    avatar?: string,
    video?: string,
    
    dob?: Date,
    created_at?: Date,
    updated_at?: Date,
    is_deleted?: boolean,
    is_verified?: boolean,
    is_subscribed?: boolean
    // add this parameter
    // is_subscribed?: boolean
  ) {
    super(
      _id,
      name,
      email,
      role,
      status,
      google_id,
      password,
      phone_number,
      description,
      avatar,
      video,
      dob,
      created_at,
      updated_at,
      is_deleted,
      is_verified ,
      
      // add this parameter to super
    );
    this.is_subscribed = is_subscribed;
    this.description = description;
    this.degree = degree;
  }
}
