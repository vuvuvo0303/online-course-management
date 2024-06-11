import styles from './cart.module.css'
const Cart: React.FC = () => {
    return (
        <div className="py-0 px-[4.8rem] mb-[6.4rem] max-w-[134rem] my-0 mx-auto">
            <h1 className="mt-12 main_h1">Course Cart</h1>
            <div className="mt-[4.8rem]">
                <div className="flex-1 mt-0">
                    <h3 className="main_h3">1 Course in Cart</h3>
                    <hr className="text-[#d1d7dc]" />
                    <div>
                        <ul className="min-w-full m-0 p-0">
                            <div className="py-[1.6rem] px-0">
                                <div className={styles.item_container}>
                                    <div className={styles.image_area}>
                                        <div className={styles.image_wrapper}>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart