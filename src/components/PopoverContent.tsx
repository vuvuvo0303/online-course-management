import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../models";
import { getCarts } from "../services";

interface PopoverContentProps {
    cartsNew: Cart[];
    cartsCancel: Cart[];
    totalCost: number;
}

const CourseCard = ({ image, title, author, price }: { image: string; title: string; author: string; price: string }) => {
    return (
        <div className="flex items-center p-2 max-w-[21rem]">
            <img src={image} alt={title} className="w-16 h-16 rounded-md" />
            <div className="ml-4">
                <h4 className="text-base font-bold">{title}</h4>
                <p className="text-xs text-gray-600">{author}</p>
                <p className="text-lg font-semibold text-blue-500">{price} </p>
            </div>
        </div>
    );
};

const PopoverContent: React.FC<PopoverContentProps> = ({ totalCost = 0 }) => {
    const [loading, setLoading] = useState(true);
    const [carts, setCarts] = useState<{ cartsNew: Cart[], cartsCancel: Cart[] }>({ cartsNew: [], cartsCancel: [] });

    useEffect(() => {
        const fetchCarts = async () => {
            const cartsNewResponse = await getCarts('new');
            const cartsCancelResponse = await getCarts('cancel');
            setCarts({
                cartsNew: cartsNewResponse,
                cartsCancel: cartsCancelResponse,
            });
            setLoading(false);
        };

        fetchCarts();
    }, []);

    if (loading) {
        return <div className="text-center items-center py-5 mt-2 ml-[1rem] px-4 w-[19rem] rounded">Loading...</div>;
    }

    const isEmpty = carts.cartsNew.length === 0 && carts.cartsCancel.length === 0;

    return (
        <div className="">
            {isEmpty ? (
                <div className="text-center items-center py-5 mt-2 ml-[1rem] px-4 w-[19rem] rounded">
                    No Data
                </div>
            ) : (
                <>
                    {carts.cartsNew.map((cart) => (
                        <div key={cart._id}>
                            <Link to={`/course/${cart.course_id}`}>
                                <CourseCard
                                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={cart.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </div>
                    ))}
                    {carts.cartsCancel.map((cart) => (
                        <div key={cart._id}>
                            <Link to={`/course/${cart.course_id}`}>
                                <CourseCard
                                    image="https://hiu.vn/wp-content/uploads/2020/03/Khoa_KHOAHOCCOBAN.png"
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={cart.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </div>
                    ))}
                    <button className="mt-2 ml-[1rem] px-4 py-2 bg-black text-white w-[19rem] rounded">View cart</button>
                    <div className="mt-4 pb-2 text-lg ml-[5.7rem] font-bold">Total: {totalCost.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} </div>
                </>
            )}
        </div>
    );
};

export default PopoverContent;
