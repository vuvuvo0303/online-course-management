export class Purchase {
  _id: string;
  purchase_no: string;
  status: string;
  price_paid: number;
  price: number;
  discount: number;
  cart_id: string;
  cart_no: string;
  course_id: string;
  course_name: string;
  student_id: string;
  student_name: string;
  instructor_id: string;
  instructor_name: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;

  constructor(
    _id: string = "",
    purchase_no: string = "",
    status: string = "",
    price_paid: number = 0,
    price: number = 0,
    discount: number = 0,
    cart_id: string = "",
    cart_no: string = "",
    course_id: string = "",
    course_name: string = "",
    student_id: string = "",
    student_name: string = "",
    instructor_id: string = "",
    instructor_name: string = "",
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    is_deleted: boolean = false
  ) {
    this._id = _id;
    this.purchase_no = purchase_no;
    this.status = status;
    this.price_paid = price_paid;
    this.price = price;
    this.discount = discount;
    this.cart_id = cart_id;
    this.cart_no = cart_no;
    this.course_id = course_id;
    this.course_name = course_name;
    this.student_id = student_id;
    this.student_name = student_name;
    this.instructor_id = instructor_id;
    this.instructor_name = instructor_name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.is_deleted = is_deleted;
  }
}

export class TransactionsPurchase {
  purchase_id: string;

  constructor(purchase_id: string = "") {
    this.purchase_id = purchase_id;
  }
}
