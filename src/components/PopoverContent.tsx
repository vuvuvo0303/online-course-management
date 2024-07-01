import { Link } from "react-router-dom";

const CourseCard = ({ image, title, author, price }: { image: string; title: string; author: string; price: string }) => {
    return (
        <div className="flex items-center p-2 max-w-[21rem]">
            <img src={image} alt={title} className="w-16 h-16 rounded-md" />
            <div className="ml-4">
                <h4 className="text-base font-bold">{title}</h4>
                <p className="text-xs text-gray-600">{author}</p>
                <p className="text-lg font-semibold text-blue-500">{price} đ</p>
            </div>
        </div>
    );
};

const Popup = () => {
    return (
        <div className="">
            <Link to="/">
                <CourseCard
                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                    title="100 Days of Code: The Complete Python Pro Bootcamp"
                    author="Dr. Angela Yu, Developer and Lead Instructor"
                    price="2,199,000"
                />
            </Link>
            <hr className="w-full my-4 border-gray-300" />
            <Link to="/">
                <CourseCard
                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                    title="100 Days of Code: The Complete Python Pro Bootcamp"
                    author="Toan Bill"
                    price="1,499,000"
                />
            </Link>
            <hr className="w-full my-4 border-gray-300" />
            <button className="mt-2 ml-[1rem] px-4 py-2 bg-black text-white w-[19rem] rounded">View cart</button>
            <div className="mt-4 pb-2 text-lg ml-[5.7rem] font-bold">Total: 3,698,000 đ</div>
        </div>
    ); 9
};

export default Popup;
