export class Review {
    reviewId: string;
    rating: string;
    message: string;
    createdDate: string;
    updatedDate: string;
    userId: string;
    courseId: string;

    constructor(
        reviewId: string = "",
        rating: string = "",
        message: string = "",
        createdDate: string = "",
        updatedDate: string = "",
        userId: string = "",
        courseId: string = ""
    ) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.message = message;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.userId = userId;
        this.courseId = courseId;
    }
}
