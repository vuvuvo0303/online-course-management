export class Course {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    description: string;
    content: string;
    status: string;
    video_url?: string;
    image_url?: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    user_name: string;
    category_name: string;
    session_count: string;
    lesson_count: string;
    constructor(
      _id: string = "",
      name: string = "",
      category_id: string = "",
      user_id: string = "",
      content: string = "",
      video_url: string = "",
      image_url: string = "",
      price: number = 0,
      discount: number = 0,
      is_deleted: boolean = false,
      created_at: Date = new Date(),
      updated_at: Date = new Date(),
      status: string = "",
      description: string = "",
      user_name: string = "",
      category_name: string = "",
      session_count: string = "",
      lesson_count: string = "",
    ) {
      this._id = _id;
      this.name = name;
      this.category_id = category_id;
      this.user_id = user_id;
      this.content = content;
      this.video_url = video_url;
      this.image_url = image_url;
      this.price = price;
      this.discount = discount;
      this.is_deleted = is_deleted;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.status = status;
      this.description = description;
      this.category_name = category_name;
      this.session_count = session_count;
      this.lesson_count = lesson_count;
      this.user_name = user_name;
    }
  }