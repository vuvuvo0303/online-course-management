
/* API */
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
export const API_BLOGS_URL = `${BASE_URL}/blogs`;


// consts/paths.ts

export const paths = {
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  REGISTER: "/register",
  TERMS: "/terms",
  POLICY: "/terms/policy",
  GUIDELINES: "/terms/guidelines",
  SUPPORT: "/support",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:id",
  CONTACT: "/contact",
  TEACHING: "/teaching",
  ENROLLMENT: "/enrollment",
  CART: "/cart",
  CREATE_COURSE: "/create-course",
  STUDENT_PAYMENT_HISTORY: "/payment-history",
  ENROLLMENT: "/enrollment",
  PAYMENT_HISTORY: "/payment-history",
  COURSE: "/course",
  SITEMAP: "/sitemap",
  NOTFOUND: "/notfound",
  INSTRUCTOR_DASHBOARD: "/instructor/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
  MANAGE_LECTURES: "/instructor/dashboard/manage-lectures",
  MANAGE_STUDENTS: "/admin/dashboard/manage-students",
  MANAGE_INSTRUCTORS: "/admin/dashboard/manage-instructors",
  MANAGE_BLOGS: "/admin/dashboard/manage-blogs",
  MANAGE_COURSES: "/admin/dashboard/manage-courses",
  MANAGE_FEEDBACKS: "/admin/dashboard/manage-feedbacks",
};


// consts/roles.ts

export const roles = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
};

/* Navbar */
export const NavLinks = [
  { href: "/", key: "Saved Courses", text: "Saved Courses" },
  { href: "/teaching", key: "Be an Instructors", text: "Be an Instructors" },
];

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

export const categorySubmenu = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-commerce",
  "Chatbots"
]

export const teacherCategories = [
  "Mr. Johnson",
  "Ms. Rodriguez",
  "Mr. Thompson",
  "Mrs. Smith",
  "Ms. Garcia",
  "Mr. Davis",
  "Mrs. Martinez",
  "Mr. Wilson",
  "Mrs. Anderson",
  "Mr. Taylor",
  "Ms. Thomas",
  "Mrs. Clark",
  "Mr. Lewis"
];

/* Sidebar Policies */
export const sidebarPolicies = [
  { id: 1, name: "Terms of Use", link: "/terms" },
  { id: 2, name: "Privacy Policy", link: "/terms/policy" },
  { id: 3, name: "Rules and Guidelines", link: "/terms/guidelines" },
  { id: 4, name: "Intellectual Property Policy", link: "/terms/intellectual" },
  { id: 5, name: "Master Services Agreement", link: "/terms/agreement" },
  { id: 6, name: "Launch Services", link: "/terms/launch" },
  { id: 7, name: "Help & Support", link: "/support" },
];

/* Polices */
export const policies = [
  { id: 1, name: "1. What Data We Get", link: "#section1" },
  { id: 2, name: "2. How We Get Data About You", link: "#section2" },
  { id: 3, name: "3. What We Use Your Data For", link: "#section3" },
  { id: 4, name: "4. Who We Share Your Data With", link: "#section4" },
  { id: 5, name: "5. Security", link: "#section5" },
  { id: 6, name: "6. Your Rights", link: "#section6" },
  { id: 7, name: "7. Jurisdiction-Specific Rules", link: "#section7" },
  { id: 8, name: "8. Updates & Contact Info", link: "#section8" },
];

/* Terms */
export const terms = [
  { id: 1, name: "1. Account", link: "#section1" },
  { id: 2, name: "2. Content Subscription and Lifetime Access", link: "#section2" },
  { id: 3, name: "3. Payments, Offers and Refunds", link: "#section3" },
  { id: 4, name: "4. Content and behavior rules", link: "#section4" },
  { id: 5, name: "5. FLearn's rights to the content you post", link: "#section5" },
  { id: 6, name: "6. Use FLearn at your own risk", link: "#section6" },
  { id: 7, name: "7. FLearn Permissions", link: "#section7" },
  { id: 8, name: "8. Subscription package terms", link: "#section8" },
  { id: 9, name: "9. Other legal terms", link: "#section9" },
  { id: 10, name: "10. Dispute resolution", link: "#section10" },
  { id: 11, name: "11. Update these terms", link: "#section11" },
  { id: 12, name: "12. How to contact us", link: "#section12" },
];

/* faq */
export const faq_student = [
  { id: 1, name: "Refund Status: Common Questions", link: "#section1" },
  { id: 2, name: "Payment Methods on FLearn", link: "#section2" },
  { id: 3, name: "Lifetime Access", link: "#section3" },
  { id: 4, name: "How to Find Your Missing Course", link: "#section4" },
  { id: 5, name: "How to Download Your Certificate of Completion", link: "#section5" },
  { id: 6, name: "How to Refund a Course", link: "#section6" },
  { id: 7, name: "Downloading Course Resources", link: "#section7" },
  { id: 8, name: "Learning With FLearn: Frequently Asked Questions", link: "#section8" },
  { id: 9, name: "Troubleshooting Payment Failures", link: "#section9" },
];

export const faq_instructor = [
  { id: 1, name: "FLearn Course Quality Checklist", link: "#section1" },
  { id: 2, name: "How to Become a Premium Instructor", link: "#section2" },
  { id: 3, name: "Promote Your Course With Coupons and Referral Links", link: "#section3" },
  { id: 4, name: "Instructor Revenue Share", link: "#section4" },
  { id: 5, name: "Instructor Promotional Agreements and FLearn Deals", link: "#section5" },
  { id: 6, name: "Teaching on FLearn: Frequently Asked Questions", link: "#section6" },
];

/* topic */
export const topic_student = [
  { id: 1, name: "Account/Profile", description: "Manage your account settings.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FJ75XEBMHTVM355A2ATG", link: "#section1" },
  { id: 2, name: "Troubleshooting", description: "Experiencing a technical issue? Check here.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FM9JPEPTW2N7HD3XSSST", link: "#section1" },
  { id: 3, name: "Learning Experience", description: "Everything about the FLearn learning", img: "https://support.udemy.com/hc/theming_assets/01HZP8FDKGE7PT2EXYKDQZ8BD6", link: "#section1" },
  { id: 4, name: "Purchase/Refunds", description: "Learn about purchasing courses, how to send gifts, and refunds", img: "https://support.udemy.com/hc/theming_assets/01HZP8FJB5Y47293NZF0220ZKY", link: "#section1" },
  { id: 5, name: "Mobile", description: "On the go? Learn about our mobile app", img: "https://support.udemy.com/hc/theming_assets/01HZP8FGTNPB2Z3MC5WWRWTSAZ", link: "#section1" },
  { id: 6, name: "Trust & Safety", description: "Trust & Safety information and reporting", img: "https://support.udemy.com/hc/theming_assets/01HZP8FMD53E72SM31SP8RT0MM", link: "#section1" },
]

export const topic_instructor = [
  { id: 1, name: "Instructor Payments", description: "Understand the revenue share and how to receive payments.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FJ3P0VC64QMBMBXKSDMQ", link: "#section1" },
  { id: 2, name: "Selling & Promotion", description: "Learn about the announcement.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FKSFR8QFBH1N595WYPTM", link: "#section1" },
  { id: 3, name: "Course Building", description: "Build your course curriculum and landing page.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FDKGE7PT2EXYKDQZ8BD6", link: "#section1" },
  { id: 4, name: "Course Management", description: "Maintain your course and engage with students.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FM2TN5216VEXR1GY2RMS", link: "#section1" },
  { id: 5, name: "Trust & Safety", description: "Policy and copyright questions and guidance.", img: "https://support.udemy.com/hc/theming_assets/01HZP8FMD53E72SM31SP8RT0MM", link: "#section1" },
]

/* Footer */
export const footerLinks = [
  {
    links: [
      { name: "About us", url: "/about" },
      { name: "Contact us", url: "/contact" },
    ],
  },
  {
    links: [
      { name: "Teach on FLearn", url: "/instructor" },
      { name: "Blog", url: "/blog" },
      { name: "Help and Supports", url: "/contact" },
    ],
  },

  {
    links: [
      { name: "Terms", url: "/terms" },
      { name: "Private policy", url: "/policy" },
      { name: "Sitemap", url: "/sitemap" },
    ],
  },
];


