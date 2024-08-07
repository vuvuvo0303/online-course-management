import { format } from "date-fns";

export const formatMinute = (time: number) => {
    const minutes = time;
    const hours = minutes > 60 ? `${Math.floor(minutes/60)}h ${minutes%60}m` : `${minutes}m`
    return hours;
}

export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};


export const formatDate = (date: string | number | Date | undefined, dateFormat: string = "dd/MM/yyyy"): string => {
    return date ? format(new Date(date), dateFormat) : "";
};

export const upperCaseFirstLetter = (word: string | undefined): string => {
    if (!word) return "";
  
    return word
      .split(' ')
      .map(wordPart => wordPart.charAt(0).toUpperCase() + wordPart.slice(1).toLowerCase())
      .join(' ');
  };
  

export const formatDescription = (description: string,showFullDescription: boolean ) => {
    if (!description) return "";

    const formattedDescription = description.split('.').join('.\n');

    const words = formattedDescription.split(' ');
    if (words.length > 150 && !showFullDescription) {
        return words.slice(0, 150).join(' ') + '...';
    }
    return formattedDescription;
};


export const renderPayoutStatus = (status: string) => {
    switch (status){
          case "new":
            return "New";
          case "request_payout":
            return "Request Payout";
          case "completed":
            return "Completed";
          case "rejected":
            return "Rejected";
        } 
    }

export const renderPurchaseStatus = (status: string) => {
    switch (status){
        case "new":
            return "New";
        case "request_paid":
            return "Request Paid";
        case "completed":
            return "Completed";
    }
}

export const renderCourseStatus = (status: string) => {
    switch (status){
        case "new":
            return "New";
        case "waiting_approve":
            return "Waiting Approve"
        case "approve":
            return "Approve";
        case "reject":
            return "Reject";
        case "active":
            return "Active";
        case "inactive":
            return "Inactive"
    }
}