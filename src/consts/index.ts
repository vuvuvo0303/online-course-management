const BASE_URL = "https://665fbf245425580055b0b23d.mockapi.io";
export const API_STUDENT_URL = `${BASE_URL}/students`;
export const API_INSTRUCTOR_URL = `${BASE_URL}/instructors`;
export const API_ADMIN_URL = `${BASE_URL}/admins`;
export const API_COURSES_URL = `${BASE_URL}/courses`;
export const API_COMMENT_URL = `${BASE_URL}/comments`;
export const API_ENROLLMENT_URL = `${BASE_URL}/enrollments`;
export const API_LECTURE_URL = `${BASE_URL}/lectures`;
export const API_PAYMENT_URL = `${BASE_URL}/payments`;
export const API_REVIEW_URL = `${BASE_URL}/reviews`;

export const NavLinks = [
  { href: "/", key: "Categories", text: "Categories" },
  { href: "/", key: "Saved Courses", text: "Saved Courses" },
  { href: "/", key: "All Instructors", text: "All Instructors" },
  { href: "/", key: "FAQ", text: "FAQ" },
];

// export const InstructorLinks = [
//   { href: "/", key: "Inspiration", text: "Inspiration" },
//   { href: "/", key: "Find Projects", text: "Find Projects" },
//   { href: "/", key: "Learn Development", text: "Learn Development" },
//   { href: "/", key: "Career Advancement", text: "Career Advancement" },
//   { href: "/", key: "Hire Developers", text: "Hire Developers" },
// ];

export const categoryFilters = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
];

export const footerLinks = [
  {
    title: "For students",
    links: [
      { name: "Explore more courses", url: "/explore" },
      { name: "Search for instructor", url: "/instructors" },
    ],
  },
  {
    title: "For instructors",
    links: [
      { name: "Teach on FLearn", url: "/" },
      { name: "About us", url: "/about" },
      { name: "Contact us", url: "/contact" },
    ],
  },

  {
    title: "Policy and terms",
    links: [
      { name: "Our terms & policy", url: "/terms" },
      { name: "Help & Support", url: "/help" },
      { name: "Send feedback", url: "/feedback" },
    ],
  },
];

export const terms = [
  { name: "1. Account", link: "#section1" },
  { name: "2. Content Subscription and Lifetime Access", link: "#section2" },
  { name: "3. Payments, Offers and Refunds", link: "#section3" },
  { name: "4. Content and behavior rules", link: "#section4" },
  { name: "5. FLearn's rights to the content you post", link: "#section5" },
  { name: "6. Use FLearn at your own risk", link: "#section6" },
  { name: "7. FLearn Permissions", link: "#section7" },
  { name: "8. Subscription package terms", link: "#section8" },
  { name: "9. Other legal terms", link: "#section9" },
  { name: "10. Dispute resolution", link: "#section10" },
  { name: "11. Update these terms", link: "#section11" },
  { name: "12. How to contact us", link: "#section12" },
];
