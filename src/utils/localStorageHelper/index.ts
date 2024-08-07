import { getCourseDetailByStudent } from "../../services";

export const getCoursesFromLocalStorage = async () => {
    const courseIds = JSON.parse(localStorage.getItem("courseInWishList") || "[]");
    const getCourseDetail = courseIds.map((courseId: string) => getCourseDetailByStudent(courseId));
    const courseDetails = await Promise.all(getCourseDetail);
    return courseDetails;
  }