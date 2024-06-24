export class Lecture{
    lectureId: string
    title: string
    description: string
    videoUrl: string 
    createdDate: string 
    updatedDate: string 
    courseId: string 
    status: boolean
    constructor(
        lectureId: string = "",
        title: string = "",
        description: string = "",
        videoUrl: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        courseId: string = "",
        status: boolean = false
    ){
        this.lectureId = lectureId;
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.courseId = courseId; 
        this.status = status; 
    }
}