import { SearchOutlined } from '@ant-design/icons'
import styles from './enrollment.module.css'
import WishListCard from '../../components/wishlistCard/WishListCard'


const WishList = () => {
    return (
        <div className={styles.body_my_course}>
            <div className={styles.course_container}>
                <div className={styles.search_course}>
                    <div className={styles.search_course_left}></div>
                    <div className={styles.search_course_right}>
                        <div className='w-[23rem]'>
                            <form>
                                <div className='max-w-none min-w-[18rem]'>
                                    <label className={styles.form_label}>Search my courses</label>
                                    <div className='flex'>
                                        <div className='flex-1 relative'>
                                            <input type="text" className={styles.input_search} placeholder='Search my courses' />
                                        </div>
                                        <button className={styles.search_button}>
                                            <SearchOutlined />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h1>Wish List</h1>
                <div className={styles.my_course_grid}>
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                    <WishListCard />
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default WishList