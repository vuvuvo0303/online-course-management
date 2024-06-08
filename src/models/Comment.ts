export class Comment {
    commentId: string;
    content: string;
    createdDate: string;
    updatedDate: string;
    userId: string;
    lectureId: string;

    constructor(
        commentId: string = "",
        content: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        userId: string = "",
        lectureId: string = ""
    ) {
        this.commentId = commentId;
        this.content = content;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.userId = userId;
        this.lectureId = lectureId;
    }
}
