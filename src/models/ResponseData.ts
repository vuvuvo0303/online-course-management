export default interface ResponseData {
    message: string | null;
    success: boolean;
    data: object;
    pageInfo: number
}