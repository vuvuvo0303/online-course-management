import styles from '../../components/cart/cartComponents.module.css';
import { CartComponents } from "../../components";
import { deleteCart, getCarts, updateStatusCart } from '../../services/cart.ts';
import { useEffect, useState } from 'react';
import { Cart } from '../../models';
import { useNavigate } from 'react-router-dom';
import { message } from "antd";
import { paths } from "../../consts";
const CartPage: React.FC = () => {
  const [cartsNew, setCartsNew] = useState<Cart[]>([]);
  const [cartsCancel, setCartsCancel] = useState<Cart[]>([]);
  const [cartsWaitingPaid, setCartsWaitingPaid] = useState<Cart[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [cartsChecked, setCartsChecked] = useState<Cart[]>([]);
  const [indexCartChecked, setIndexCartChecked] = useState<number>(0);

  const getCartNew = async () => {
    const response = await getCarts("new");
    if (response) {
      setCartsNew(response);
      setLoading(false);
    }
  };

  const getCartCancel = async () => {
    const response = await getCarts("cancel");
    if (response) {
      setCartsCancel(response);
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  const getCartWaitingPaid = async () => {
    setLoading(true)
    const res = await getCarts("waiting_paid");
    if (res) {
      setCartsWaitingPaid(res);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      getCartNew();
      getCartCancel();
      getCartWaitingPaid();
    }
  }, [token]);

  if (loading) {
    return <p className='text-center'>Loading ...</p>;
  }

  const handleDeleteCart = async (cart_id: string) => {
    await deleteCart(cart_id);
    getCartNew();
    getCartCancel();
  };



  const handlePlus = (cart: Cart[]) => {
    let total = 0;
    let totalCost = 0;
    for (let index = 0; index < cart.length; index++) {
      total += cart[index].price_paid;
      totalCost += cart[index].price;
    }
    setTotalMoney(total);
    setTotalCourse(cart.length);
    setTotalCost(totalCost);
  };

  const onChangeCheckBox = (cart: Cart) => {
    let index = indexCartChecked;
    let foundCartId = cartsChecked.find(cartId => cartId === cart);
    let newArray: Cart[] = [];
    if (foundCartId) {
      newArray = cartsChecked.filter(item => item !== foundCartId);
      index--;
      setIndexCartChecked(index);
    } else {
      if (indexCartChecked === 0) {
        newArray[indexCartChecked] = cart;
        cartsChecked[index] = cart;
        index++;
        setIndexCartChecked(index);
      } else if (indexCartChecked >= 1) {
        newArray[indexCartChecked] = cart;
        cartsChecked[index] = cart;
        index++;
        setIndexCartChecked(index);
      }
    }
    if (foundCartId) {
      setCartsChecked(newArray);
      handlePlus(newArray);
      foundCartId = undefined;
    } else {
      setCartsChecked(cartsChecked);
      handlePlus(cartsChecked);
    }
  };

  const handleCheckoutNow = async () => {
    // if at least 1 cart is selected
    if (cartsChecked.length > 0) {
      for (const element of cartsChecked) {
        await updateStatusCart("waiting_paid", element._id, element.cart_no);
      }
      navigate(paths.STUDENT_CHECKOUT);
    } else {
      // if there is at least 1 cart with status is waiting paid
      if (cartsWaitingPaid.length > 0) {
        navigate(paths.STUDENT_CHECKOUT);
      } else {
        message.error("Please select at least one cart")
      }
    }
  };

  return (
    <div className="py-0 md:px-[4.8rem] px-4 mb-[4.4rem] max-w-[134rem] my-0 mx-auto">
      <h1 className="mt-10 main_h1">Course Cart</h1>
      <div className="mt-8">

        <div className=" mt-0">
          <div>
            <ul className="min-w-full m-0 p-0">
              {
                cartsNew.map((cart) =>
                  <CartComponents
                    totalCourse={totalCourse}
                    cartsNew={cartsNew}
                    cartsCancel={cartsCancel}
                    totalMoney={totalMoney}
                    totalCost={totalCost}
                    handleCheckoutNow={handleCheckoutNow}
                    onChangeCheckBox={() => onChangeCheckBox(cart)}
                    handleDeleteCart={() => handleDeleteCart(cart._id)}
                    cartsWaitingPaid={cartsWaitingPaid}
                  />
                )
              }
            </ul>

            <div className={styles.cart_checkout}>
              <div className={styles.total_price}>
                <div className={styles.total_checkout_container}>
                  <div className={styles.total_price_label}>Total:</div>
                  <div className={styles.base_price_heading}>
                    <span>₫{totalMoney}</span>
                  </div>
                  <div className={styles.discount_price_checkout}>
                    <div>
                      <s>
                        <span>₫{totalCost}</span>
                      </s>
                    </div>
                  </div>
                  <div className={styles.discount_price_checkout}>
                  </div>
                </div>
                {
                  cartsWaitingPaid.length > 0 ? (
                    cartsChecked.length > 0 ? (
                      <button onClick={handleCheckoutNow} className={styles.checkout_button}>
                        Checkout now with {cartsWaitingPaid.length} art in checkout page and {cartsChecked.length} cart checked
                      </button>
                    ) : (
                      <>
                        <button onClick={handleCheckoutNow} className={styles.checkout_button}>
                          Checkout now with {cartsWaitingPaid.length} cart in checkout page
                        </button>
                      </>
                    )

                  ) : (
                    <button onClick={handleCheckoutNow} className={styles.checkout_button}>Checkout now</button>
                  )
                }
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CartPage;
