import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart, Course } from "../models";
import { getCarts } from "../services";
import { formatCurrency } from "../utils";

interface PopoverContentProps {
    cartsNew?: Cart[];
    cartsCancel?: Cart[];
    totalCost: number;
    courses?: Course[];
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
    // const [courses, setCourses] = useState<Course[]>([]);
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
        <div className="w-[15rem]">
            {isEmpty ? (
                <div className="text-center items-center py-5 mt-2 ml-[1rem] px-4 rounded">
                    No Data
                </div>
            ) : (
                <>
                    {carts.cartsNew.map((cart) => (
                        <div key={cart._id}>
                            <Link to={`/course/${cart.course_id}`}>
                                <CourseCard
                                    image={cart.course_image}
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={formatCurrency(cart.price)}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </div>
                    ))}
                    {carts.cartsCancel.map((cart) => (
                        <div key={cart._id}>
                            <Link to={`/course/${cart.course_id}`}>
                                <CourseCard
                                    image={cart.course_image}
                                    title={cart.course_name}
                                    author={cart.instructor_name}
                                    price={formatCurrency(cart.price)}
                                />
                            </Link>
                            <hr className="w-full my-4 border-gray-300" />
                        </div>
                    ))}
                    <button className="mt-2 py-2 bg-black text-white w-full rounded">View cart</button>
                    <div className="mt-4 pb-2 text-lg text-center font-bold">Total: {formatCurrency(totalCost)}</div>
                </>
            )}
        </div>
    );
};

export default PopoverContent;
