export class Enrollment{
    enrollmentId: string 
    createdDate: string 
    totalPrice: number
    userId: string 
    courseId: string

    constructor(
        enrollmentId: string = "",
        createdDate: string = "",
        totalPrice: number = 0,
        userId: string = "",
        courseId: string = ""
    ){
        this.enrollmentId = enrollmentId;
        this.createdDate = createdDate;
        this.totalPrice = totalPrice;
        this.userId = userId;
        this.courseId = courseId;
    }
}