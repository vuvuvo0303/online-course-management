export enum LessonType {
    video = "video",
    text = "text",
    image = "image"
}

export class Lessons {
    _id: string;
    name: string;
    course_id: string;
    session_id: string;
    user_id: string;
    lesson_type: LessonType;
    description: string;
    video_url: string;
    image_url: string;
    full_time: number;
    position_order: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;

    constructor(
        _id: string = "",
        name: string = "",
        course_id: string = "",
        session_id: string = "",
        user_id: string = "",
        lesson_type: LessonType = LessonType.video,
        description: string = "",
        video_url: string = "",
        image_url: string = "",
        full_time: number = 0,
        position_order: number = 0,
        created_at: string = new Date().toISOString(),
        updated_at: string = new Date().toISOString(),
        is_deleted: boolean = false
    ) {
        this._id = _id;
        this.name = name;
        this.course_id = course_id;
        this.session_id = session_id;
        this.user_id = user_id;
        this.lesson_type = lesson_type;
        this.description = description;
        this.video_url = video_url;
        this.image_url = image_url;
        this.full_time = full_time;
        this.position_order = position_order;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_deleted = is_deleted;
    }
}
