export class Course {
  _id: string;
  name: string;
  category_id: string;
  description: string;
  status: string;
  video_url: string;
  image_url: string;
  price: number;
  content: string;
  discount: number;
  created_at: Date;
  updated_at: Date;
  price_paid: number;
  full_time: number;
  instructor_id: string;
  instructor_name: string;
  category_name: string;
  session_count: number;
  lesson_count: number;
  is_in_cart: boolean;
  is_purchased: boolean;
  average_rating: number;
  review_count: number;
  session_list: Array<{
    _id: string; // Session ID
    name: string;
    full_time: number;
    position_order: number; // Added position_order for session
    lesson_list: Array<{
      _id: string; // Lesson ID
      name: string;
      full_time: number;
      lesson_type: string; // Added lesson_type
      position_order: number; // Added position_order for lesson
    }>;
  }>;

  constructor(
    _id: string = "",
    name: string = "",
    category_id: string = "",
    description: string = "",
    content: string = "",
    status: string = "",
    video_url: string = "",
    image_url: string = "",
    price: number = 0,
    discount: number = 0,
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    price_paid: number = 0,
    full_time: number = 0,
    instructor_id: string = "",
    instructor_name: string = "",
    category_name: string = "",
    session_count: number = 0,
    lesson_count: number = 0,
    is_in_cart: boolean = false,
    is_purchased: boolean = false,
    average_rating: number = 0,
    review_count: number = 0,
    session_list: Array<{
      _id: string; // Session ID
      name: string;
      full_time: number;
      position_order: number; // Added position_order for session
      lesson_list: Array<{
        _id: string; // Lesson ID
        name: string;
        full_time: number;
        lesson_type: string; // Added lesson_type
        position_order: number; // Added position_order for lesson
      }>;
    }> = [],
  ) {
    this._id = _id;
    this.name = name;
    this.category_id = category_id;
    this.description = description;
    this.content = content;
    this.status = status;
    this.video_url = video_url;
    this.image_url = image_url;
    this.price = price;
    this.discount = discount;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.price_paid = price_paid;
    this.full_time = full_time;
    this.instructor_id = instructor_id;
    this.instructor_name = instructor_name;
    this.category_name = category_name;
    this.session_count = session_count;
    this.lesson_count = lesson_count;
    this.is_in_cart = is_in_cart;
    this.is_purchased = is_purchased;
    this.average_rating = average_rating;
    this.review_count = review_count;
    this.session_list = session_list;
  }
}
