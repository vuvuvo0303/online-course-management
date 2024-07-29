export class Cart {
    _id: string;
    cart_no: string;
    status: string;
    price: number;
    discount: number;
    course_id: string;
    student_id: string;
    instructor_id: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    course_name: string;
    student_name: string;
    price_paid: number;
    instructor_name: string;
    course_image: string;
    constructor(
      _id: string = "",
      cart_no: string = "",
      status: string = "",
      price: number = 0,
      discount: number = 0,
      course_id: string = "",
      student_id: string = "",
      instructor_id: string = "",
      created_at: Date = new Date(),
      updated_at: Date = new Date(),
      is_deleted: boolean = false,
      course_name: string = "",
      student_name: string = "",
      price_paid: number = 0,
      instructor_name: string = "",
    course_image: string = ""

    ) {
      this._id = _id;
      this.cart_no = cart_no;
      this.status = status;
      this.price = price;
      this.discount = discount;
      this.course_id = course_id;
      this.student_id = student_id;
      this.instructor_id = instructor_id;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.is_deleted = is_deleted;
      this.course_name = course_name;
      this.student_name = student_name;
      this.price_paid = price_paid;
      this.instructor_name = instructor_name;
      this.course_image = course_image
    }
  }
  