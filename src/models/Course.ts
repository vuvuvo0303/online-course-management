export class Course {
    _id: string;
    name: string;
    category_id: string;
    user_id: string;
    description: string;
    content: string;
    status: string;
    video_url: string;
    image_url: string;
    price: number;
    discount: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
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

    }
  }