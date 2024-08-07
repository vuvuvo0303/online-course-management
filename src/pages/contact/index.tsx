import {
  QuestionCircleOutlined,
  BookOutlined,
  FileDoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  YoutubeFilled,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";

import styles from "./contact.module.css";
import { Link } from "react-router-dom";
import { paths } from "../../consts";
import { CustomBreadcrumb } from "../../components";

const Contact: React.FC = () => {
  return (
    <div>
      <CustomBreadcrumb />
      <h1 className={styles.pageTitle}>Contact Us</h1>

      <div className={styles.contactContainer}>
        <section className={styles.contactSection}>
          <Link to={paths.SUPPORT} className={styles.contactLink}>
            <div className={styles.contactCircle}>
              <QuestionCircleOutlined className={styles.contactIcon} />
            </div>
            <h2>
              <strong>Help & Support</strong>
            </h2>
          </Link>
        </section>
        <section className={styles.contactSection}>
          <Link to={paths.BLOGS} className={styles.contactLink}>
            <div className={styles.contactCircle}>
              <BookOutlined className={styles.contactIcon} />
            </div>
            <h2>
              <strong>Blogs</strong>
            </h2>
          </Link>
        </section>
        <section className={styles.contactSection}>
          <Link to={paths.TERMS} className={styles.contactLink}>
            <div className={styles.contactCircle}>
              <FileDoneOutlined className={styles.contactIcon} />
            </div>
            <h2>
              <strong>Policy & Terms</strong>
            </h2>
          </Link>
        </section>
      </div>

      <div className={styles.contactContainerOuter}>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.2532598487546!2d106.7888885354281!3d10.85577860091569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527692dcbc14b%3A0xb6aada118566b9c5!2sOneHub%20Saigon!5e0!3m2!1svi!2s!4v1717499320271!5m2!1svi!2s"
            width="100%"
            height="400"
            style={{ border: "0" }}
          ></iframe>
        </div>

        <div className={styles.contactContainer2}>
          <div className={styles.contactInfo}>
            <h1>
              {" "}
              <strong>Contact Information</strong>
            </h1>
            <hr style={{ width: "250px" }} />
            <p className={styles.contactText}>
              <EnvironmentOutlined
                className={`${styles.contactIcon} text-black`}
              />
              <strong> Main Address:</strong> D1 Street, Tan Phu Ward, Thu Duc
              City, Ho Chi Minh City, Vietnam
            </p>
            <p className={styles.contactText}>
              <MailOutlined className={`${styles.contactIcon} text-black`} />
              <strong> Email Address:</strong> flearncontact@gmail.com
            </p>
            <p className={styles.contactText}>
              <PhoneOutlined className={`${styles.contactIcon} text-black`} />
              <strong> Phone Number:</strong> (+84) 766710603
            </p>
            <div className={styles.socialIconsContainer}>
              <Link to="https://www.facebook.com" target="_blank">
                <div className={`${styles.icon_container} bg-blue-700`}>
                  <FacebookFilled className={styles.socialIcon} />
                </div>
              </Link>
              <Link to="https://www.youtube.com" target="_blank">
                <div className={`${styles.icon_container} bg-red-500`}>
                  <YoutubeFilled className={styles.socialIcon} />
                </div>
              </Link>

              <Link to="https://www.instagram.com" target="_blank">
                <div className={`${styles.icon_container} bg-purple-700`}>
                  <InstagramFilled className={styles.socialIcon} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.office}>
        <h1>
          <strong>Our Offices</strong>
        </h1>
        <div className={styles.officeImages}>
          <div className={styles.officeImage}>
            <img
              src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office 1"
            />
            <p>
              Tan Thuan, Tan Thuan Dong Ward, District 7, Ho Chi Minh City,
              Vietnam
            </p>
          </div>
          <div className={styles.officeImage}>
            <img
              src="https://images.unsplash.com/photo-1525230071276-4a87f42f469e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office 2"
            />
            <p>Shibakoen 1-7-6, Minato-ku, Tokyo-to, 105-0011 Japan</p>
          </div>
          <div className={styles.officeImage}>
            <img
              src="https://images.unsplash.com/photo-1578495959700-a617c3600026?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office 3"
            />
            <p>Liangqing District, Nanning City, Guangxi Province, China</p>
          </div>
          <div className={styles.officeImage}>
            <img
              src="https://images.unsplash.com/photo-1568449024472-6782aed72e75?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office 4"
            />
            <p>Yeongdeungpogu, Seoul, Korea</p>
          </div>
          <div className={styles.officeImage}>
            <img
              src="https://plus.unsplash.com/premium_photo-1716968595140-b65cb93997e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office 5"
            />
            <p>PCCW Tower 979 King’s Road, Quarry Bay HongKong</p>
          </div>
          <div className={styles.officeImage}>
            <img
              src="https://plus.unsplash.com/premium_photo-1661955975506-04d3812be312?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Office 6"
            />
            <p>Xinyi District, Taipei City, Taiwan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
