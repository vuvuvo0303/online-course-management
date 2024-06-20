export class Course {
    courseId: string;
    title: string;
    description: string;
    duration: string;
    createdDate: string;
    updatedDate: string;
    price: number;
    rating: number;
    category: string;
    level: string;
    courseImgUrl: string;
    userId: string;
    status: boolean;
    constructor(
        courseId: string = "",
        title: string = "",
        description: string = "",
        duration: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        price: number = 0,
        rating: number = 0,
        category: string = "",
        level: string = "",
        courseImgUrl: string = "",
        userId: string = "",
        status: boolean = false
    ) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.price = price;
        this.rating = rating;
        this.category = category;
        this.level = level;
        this.courseImgUrl = courseImgUrl;
        this.userId = userId;
        this.status = status;
    }
}
