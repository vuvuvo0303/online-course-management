import { SearchOutlined } from '@ant-design/icons';
import styles from './enrollment.module.css';
import WishListCard from '../../components/wishlistCard/WishListCard';

const WishList = () => {
    return (
        <div className={styles.body_my_course}>
            <div className={styles.course_container}>
                <div className={styles.search_course}>
                    <div className={styles.search_course_left}>
                        <h1 className={styles.heading}>Wish List</h1>
                    </div>
                    <div className={styles.search_course_right}>
                        <div className='w-[23rem]'>
                            <form>
                                <div className='max-w-none min-w-[18rem]'>
                                    <label className={styles.form_label}>Search my courses</label>
                                    <div className='flex'>
                                        <div className='flex-1 flex relative lg:ml-7 md:ml-20' style={{ flexDirection: 'row' }}>
                                            <input type="text" className={styles.input_search} placeholder='Search my courses' />
                                            <button className={styles.search_button}>
                                                <SearchOutlined />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.my_course_grid}>
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                </div>
            </div>
        </div>
    );
};

export default WishList;
