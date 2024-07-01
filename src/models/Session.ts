export class Session{
    sessionId: string 
    title: string
    description: string
    createdDate: string 
    updatedDate: string 
    courseId: string 
    status: boolean
    userId: string 
    constructor(
        sessionId: string = "",
        title: string = "",
        description: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        courseId: string = "",
        userId: string = "",
        status: boolean = false
    ){
        this.sessionId = sessionId;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.courseId = courseId; 
        this.status = status; 
        this.userId = userId;
    }
}