export class Session {
    _id: string;
    name: string;
    user_id: string;
    course_id: string;
    description: string;
    position_order: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;

    constructor(
        _id: string = "",
        name: string = "",
        user_id: string = "",
        course_id: string = "",
        description: string = "",
        position_order: number = 0,
        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false
    ) {
        this._id = _id;
        this.name = name;
        this.user_id = user_id;
        this.course_id = course_id;
        this.description = description;
        this.position_order = position_order;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_deleted = is_deleted;
    }
}
