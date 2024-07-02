export class Category {
    _id: string;
    name: string;
    description: string;
    parent_category_id: string | null;
    user_id: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    __v: number;

    constructor(
        _id: string = "",
        name: string = "",
        description: string = "",
        parent_category_id: string | null = null,
        user_id: string = "",
        is_deleted: boolean = false,
        created_at: string = "",
        updated_at: string = "",
        __v: number = 0
    ) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.parent_category_id = parent_category_id;
        this.user_id = user_id;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.__v = __v;
    }
}
