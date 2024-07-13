export class Review {
    _id: string;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    course_id: string;
    is_deleted: boolean;
    reviewer_name: string;
    reviewer_id: string;
    course_name: string;

    constructor(
        _id: string = "",
        rating: number = 0,
        comment: string = "",
        created_at: Date,
        updated_at: Date,
        user_id: string = "",
        course_id: string = "",
        is_deleted: boolean = false,
        reviewer_name: string = "",
        reviewer_id: string = "",
        course_name: string = "",

    ) {
        this._id = _id;
        this.rating = rating;
        this.comment = comment;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user_id = user_id;
        this.course_id = course_id;
        this.is_deleted = is_deleted;
        this.reviewer_name = reviewer_name;
        this.reviewer_id = reviewer_id;
        this.course_name = course_name;
    }
}
