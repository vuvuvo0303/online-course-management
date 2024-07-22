
import { CartComponents } from "../../components";

const Cart: React.FC = () => {
  return (
    <div className="py-0 md:px-[4.8rem] px-4 mb-[4.4rem] max-w-[134rem] my-0 mx-auto">
      <h1 className="mt-10 main_h1">Course Cart</h1>
      <div className="mt-8">
    
        <div className=" mt-0">
          <div>
            <ul className="min-w-full m-0 p-0">
                <CartComponents />

            </ul>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Cart;
