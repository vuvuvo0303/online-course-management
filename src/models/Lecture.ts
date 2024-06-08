export class Lecture{
    lectureId: string
    title: string
    description: string
    videoUrl: string 
    createdDate: string 
    updatedDate: string 
    courseId: string 

    constructor(
        lectureId: string = "",
        title: string = "",
        description: string = "",
        videoUrl: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        courseId: string = ""
    ){
        this.lectureId = lectureId;
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.courseId = courseId; 
    }
}