import { Cart } from "../models";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { displayCart } from "../services";

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
    const [totalCost, setTotalCost] = useState<number>(0);
    useEffect(() => {
        getCart();
    }, [])
    // show cart when student hover shop cart icon
    const getCart = async () => {
     
        const res = await displayCart("new" && "cancel");
        setCarts(res);
        if (res) {
            let totalCost = 0;
            setCarts(res);
            console.log("res: ", res);
            for (let index = 0; index < res.length; index++) {
              totalCost += res[index].price
            }
            setTotalCost(totalCost);
          }
    }

    const [carts, setCarts] = useState<Cart[]>([])
    return (
        <div className="">
            {
                carts.map((cart) => {
                    return (
                        <>
                            <Link to="/">
                                <CourseCard
                                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={cart.price+""}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </>
                    )
                })
            }

            <button className="mt-2 ml-[1rem] px-4 py-2 bg-black text-white w-[19rem] rounded">View cart</button>
            <div className="mt-4 pb-2 text-lg ml-[5.7rem] font-bold">Total: {totalCost}</div>
        </div>
    ); 9
};

export default Popup;
