export class Payment{
    _id: string = "";
    purchase_no: string = "";
    status: string = "";
    price_paid: number = 0;
    price: number = 0;
    discount: number = 0;
    cart_id: string = "";
    course_id: string = "";
    student_id: string = "";
    instructor_id: string = "";
    created_at: Date = new Date();
    is_deleted: boolean = false;
    course_name: string = "";
    student_name: string = "";
    instructor_name: string = "";
    constructor(
        _id: string,
        status: string,
        price: number,
        purchase_no: string,
        discount: number,
        course_id: string,
        student_id: string,
        instructor_id: string,
        created_at: Date,
        price_paid: number,
        cart_id : string,
        is_deleted: boolean,
        student_name : string,
        instructor_name : string,
    ){
        this._id = _id;
        this.purchase_no  = purchase_no;
        this.status = status;
        this.price_paid = price_paid;
        this.price = price;
        this.discount = discount;
        this.cart_id = cart_id;
        this.course_id = course_id;
        this.student_id = student_id;
        this.instructor_id = instructor_id;
        this.created_at = created_at;
        this.student_name = student_name;
        this.instructor_name = instructor_name;
        this.is_deleted = is_deleted;
    }
}