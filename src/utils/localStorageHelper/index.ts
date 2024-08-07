import { User } from "../../models";
import { getCourseDetailByStudent } from "../../services";
import { paths } from "../../consts";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const getCoursesFromLocalStorage = async () => {
    const courseIds = JSON.parse(localStorage.getItem("courseInWishList") || "[]");
    const getCourseDetail = courseIds.map((courseId: string) => getCourseDetailByStudent(courseId));
    const courseDetails = await Promise.all(getCourseDetail);
    return courseDetails;
  }

  export const handSaveCourseToLocalStorage = (courseId: string, user: User,navigate: ReturnType<typeof useNavigate>) => {
    if (!user) {
        navigate(paths.LOGIN);
        message.info('Please login before saving items to your wishlist.');
    } else {
        const courseInWishList = JSON.parse(localStorage.getItem("courseInWishList") || "[]");

        if (courseInWishList.includes(courseId)) {
            message.info("The course is already in the wishlist.");
        } else {
            courseInWishList.push(courseId);
            localStorage.setItem("courseInWishList", JSON.stringify(courseInWishList));
            message.success("Save Course To Wishlist Successfully!");
        }
    }
};