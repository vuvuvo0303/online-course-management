import { Tabs } from "antd";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router
import styles from "./enrollment.module.css";
import MyList from "./MyList";
import WishList from "./WishList";
import Achieved from "./Achieved";

const Enrollment: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('activeTab') || "2"; // Default to "2" if no query param

  return (
    <div className="pt-[2.8rem]">
      <div className="w-[85%] mx-auto">
        <h1 className={styles.heading}>My Learning</h1>
        <Tabs
          defaultActiveKey={activeTab}  // Set defaultActiveKey based on query parameter
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
              children: <WishList />,
            },
            {
              label: 'Achieved',
              key: '3',
              children: <Achieved />
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Enrollment;
