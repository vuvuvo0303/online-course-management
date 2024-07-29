import { Review } from "../../models";

export const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / reviews.length).toFixed(1));
};

export const countRatings = (reviews: Review[]): number[] => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            counts[5 - review.rating]++;
        }
    });
    return counts;
};