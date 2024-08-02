import { format } from "date-fns";

export const formatMinute = (time: number) => {
    const minutes = time;
    const hours = minutes > 60 ? `${Math.floor(minutes/60)}h${minutes%60}m` : `${minutes}m`
    return hours;
}

export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};


export const formatDate = (date: string | number | Date | undefined, dateFormat: string = "dd/MM/yyyy"): string => {
    return date ? format(new Date(date), dateFormat) : "";
};

export const upperCaseFirstLetter = (word: string | undefined): string => 
    (word ?? "").charAt(0).toUpperCase() + (word ?? "").slice(1);

export const formatDescription = (description: string,showFullDescription: boolean ) => {
    if (!description) return "";

    const formattedDescription = description.split('.').join('.\n');

    const words = formattedDescription.split(' ');
    if (words.length > 150 && !showFullDescription) {
        return words.slice(0, 150).join(' ') + '...';
    }
    return formattedDescription;
};
