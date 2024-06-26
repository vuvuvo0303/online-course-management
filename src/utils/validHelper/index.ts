// /* Validation for email */
// function isValidEmail(email: string) : boolean {
//     const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//     return emailRegex.test(email);
// }

// /* Validation for phone number */
// function isValidPhoneNumber(phoneNumber : string) : boolean{
//     const phoneRegex = /^(0|\+84)(\d{9})$/;
//     return phoneRegex.test(phoneNumber);
// }

// utils/removePassword.ts

export function removePassword(user: any) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

