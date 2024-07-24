import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { Cart } from "../models";
import { getCarts } from "../services";

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
    const [cartNew, setCartNew] = useState<Cart[]>([]);
    const [cartCancel, setCartCancel] = useState<Cart[]>([]);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        const res = await getCarts("new");
        const res2 = await getCarts("cancel");
        let totalCost = 0;

        if (res) {
            setCartNew(res);
            for (let index = 0; index < res.length; index++) {
                totalCost += res[index].price;
            }
        }

        if (res2) {
            setCartCancel(res2);
            for (let index = 0; index < res2.length; index++) {
                totalCost += res2[index].price;
            }
        }

        setTotalCost(totalCost);
    };

    return (
        <div className="">
            {cartNew.length === 0 && cartCancel.length === 0 ? (
                <Empty description="No items" />
            ) : (
                <>
                    {cartNew.map((cart) => (
                        <React.Fragment key={cart.course_id}>
                            <Link to="/">
                                <CourseCard
                                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={cart.price + ""}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </React.Fragment>
                    ))}
                    {cartCancel.map((cart) => (
                        <React.Fragment key={cart.course_id}>
                            <Link to="/">
                                <CourseCard
                                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={cart.price + ""}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </React.Fragment>
                    ))}
                    <button className="mt-2 ml-[1rem] p-2 bg-black text-white w-[19rem] rounded">View cart</button>
                    <div className="mt-4 pb-2 text-lg ml-[5.7rem] font-bold">Total: {totalCost}</div>
                </>
            )}
        </div>
    );
};

export default Popup;
