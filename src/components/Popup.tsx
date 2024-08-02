import { paths } from "../consts";
import { Link } from "react-router-dom";

const CourseCard = ({ avatar, name, description, duration }: { avatar: string; name: string; description: string; duration: string }) => {
    return (
        <div className="flex items-center p-2 max-w-[15rem]">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            <div className="ml-4">
                <h4 className="text-base font-bold">{name}</h4>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="text-xs font-semibold text-[lightgray]">{duration} min ago</p>
            </div>
        </div>
    );
};

const Popup = () => {
    return (
        <div className="">
            <Link to={paths.HOME}>
                <CourseCard
                    avatar="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                    name="System"
                    description="Dr. Angela Yu, Developer and Lead Instructor"
                    duration="2"
                />
            </Link>
            <hr className="w-full my-4 border-gray-300" />
            <Link to="/">
                <CourseCard
                    avatar="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                    name="Dr. Angela Yu"
                    description="Dr. Angela Yu, Developer and Lead Instructor"
                    duration="3"
                />
            </Link>
            <hr className="w-full mt-4 border-gray-300" />
            <button className="px-4 py-2 bg-black text-white w-[15rem]">View cart</button>
        </div>
    );
};

export default Popup;
