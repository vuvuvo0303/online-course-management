export class Log {
    _id: string;
    user_id: string;
    user_name: string;
    course_id: string;
    course_name: string;
    old_status: string;
    new_status: string;
    comment: string;
    created_at: Date;
    is_deleted: boolean;

    constructor(
        _id: string = "",
        user_id: string = "",
        user_name: string = "",
        course_id: string = "",
        course_name: string = "",
        old_status: string = "",
        new_status: string = "",
        comment: string = "",
        created_at: Date = new Date(),
        is_deleted: boolean = false
    ) {
        this._id = _id;
        this.user_id = user_id;
        this.user_name = user_name;
        this.course_id = course_id;
        this.course_name = course_name;
        this.old_status = old_status;
        this.new_status = new_status;
        this.comment = comment;
        this.created_at = created_at;
        this.is_deleted = is_deleted;
    }
}
