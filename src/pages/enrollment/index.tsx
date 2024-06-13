import { Tabs } from "antd";
import styles from "./enrollment.module.css"
import MyList from "./MyList";
import WishList from "./WishList";

const Enrollment: React.FC = () => {
  return (
    <div className="pt-[2.8rem]">
      <div className="w-[85%] mx-auto">
        <h1 className={styles.heading}>My Learning</h1>
        <Tabs
          defaultActiveKey="2"
          centered
          items={[
            {
              label: 'My List',
              key: '1',
              children: <MyList />,
            },
            {
              label: 'Wishlist',
              key: '2',
              children: <WishList />
            },
            {
              label: 'Achieved',
              key: '3',
              children: 'Content of Achieved Tab',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Enrollment;
