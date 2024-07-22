export class Payout {
    _id: string = "";
    payout_no: string = "";
    status: string = "";
    transactions: Array<{
        price: number;
        discount: number;
        price_paid: number;
        purchase_id: string;
        _id: string;
        created_at: Date;
    }> = [];
    instructor_id: string = "";
    balance_origin: number = 0;
    balance_instructor_paid: number = 0;
    balance_instructor_received: number = 0;
    is_deleted: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();
    instructor_name: string = "";
    instructor_email: string = "";

    constructor(
        _id: string,
        payout_no: string,
        status: string,
        transactions: Array<{
            price: number;
            discount: number;
            price_paid: number;
            purchase_id: string;
            _id: string;
            created_at: Date;
        }>,
        instructor_id: string,
        balance_origin: number,
        balance_instructor_paid: number,
        balance_instructor_received: number,
        is_deleted: boolean,
        created_at: Date,
        updated_at: Date,
        instructor_name: string,
        instructor_email: string
    ) {
        this._id = _id;
        this.payout_no = payout_no;
        this.status = status;
        this.transactions = transactions;
        this.instructor_id = instructor_id;
        this.balance_origin = balance_origin;
        this.balance_instructor_paid = balance_instructor_paid;
        this.balance_instructor_received = balance_instructor_received;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.instructor_name = instructor_name;
        this.instructor_email = instructor_email;
    }
}
