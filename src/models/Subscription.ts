export class Subscription {
    _id: string;
    subscriber_id: string;
    subscriber_name: string;
    instructor_id: string;
    instructor_name: string;
    is_subscribed: boolean;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;

    constructor(
        _id: string = "",
        subscriber_id: string = "",
        subscriber_name: string = "",
        instructor_id: string = "",
        instructor_name: string = "",
        is_subscribed: boolean = false,
        created_at: Date = new Date(),
        updated_at: Date = new Date(),
        is_deleted: boolean = false
    ) {
        this._id = _id;
        this.subscriber_id = subscriber_id;
        this.subscriber_name = subscriber_name;
        this.instructor_id = instructor_id;
        this.instructor_name = instructor_name;
        this.is_subscribed = is_subscribed;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.is_deleted = is_deleted;
    }
}
