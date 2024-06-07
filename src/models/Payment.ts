export class Payment{
    paymentId: string = "";
    amount: number = 0;
    createdDate: string = "";
    paymentMethod: string = "";
    status: string = "";
    userId: string = "";
    enrollmentId: string = "";

    constructor(
        paymentId: string = "",
        amount: number = 0,
        createdDate: string = "",
        paymentMethod: string = "",
        status: string = "",
        userId: string = "",
        enrollmentId: string = "",
    ){
        this.paymentId = paymentId;
        this.amount = amount;
        this.createdDate = createdDate;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.userId = userId;
        this.enrollmentId = enrollmentId;
    }
}