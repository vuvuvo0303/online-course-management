import {
  Dropdown,
  Badge,
  Space,
  MenuProps,
  Row,
  Col,
  Avatar,
  Popover,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../consts";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import SearchTool from "../SearchTool";
import Drawer from "../Drawer";
import PopoverContent from "../PopoverContent";
import { logout } from "../../services/auth.ts";
import { getCarts } from "../../services";
import { Cart } from "../../models/Cart.ts";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [totalCarts, setTotalCarts] = useState<number>(0);
  const [dataUser, setDataUser] = useState<{
    role: string | null;
    fullName: string | null;
    email: string | null;
    avatarUrl: string | null;
  }>({
    role: null,
    fullName: null,
    email: null,
    avatarUrl: null,
  });
  const isLoginOrRegister =
    location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isForgotPassword = location.pathname === "/forgot-password";
  // Create a submenu for each categoryFilter
  const user = localStorage.getItem("user");

  const token = localStorage.getItem("token");
  const [cartsNew, setCartsNew] = useState<Cart[]>([]);
  const [cartsCancel, setCartsCancel] = useState<Cart[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // show cart when student hover shop cart icon
  const getCart = async () => {
    const res = await getCarts("new");
    const res2 = await getCarts("cancel");
    let totalCost = 0;

    if (res) {
      setCartsNew(res);
      for (let index = 0; index < res.length; index++) {
        if (res[index] && res[index].price !== undefined) {
          totalCost += res[index].price;
        }
      }
    }

    if (res2) {
      setCartsCancel(res2);
      for (let index = 0; index < res2.length; index++) {
        if (res2[index] && res2[index].price !== undefined) {
          totalCost += res2[index].price;
        }
      }
    }

    setTotalCost(totalCost);
  };


  useEffect(() => {
    if (token) {
      getCart();
      countCart();
    }
    if (user) {
      const userData = JSON.parse(user);
      setDataUser({
        role: userData.role,
        fullName: userData.name,
        email: userData.email,
        avatarUrl: userData.avatar,
      });
    }
  }, []);

  const countCart = async () => {
    const res = await getCarts("new");
    if (res) {
      setTotalCarts(res.length);
    }
  };

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-sm">
          <Row>
            <Col span={8} className="pl-3 pt-2 pb-2">
              <Avatar
                src={dataUser.avatarUrl ? dataUser.avatarUrl : paths.AVATAR}
                className="hover:cursor-pointer mt-1"
                size={50}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16} className="pt-3 pr-3">
              <Row>
                <p className="text-base font-bold">{dataUser.fullName}</p>
              </Row>
              <div>
                <p className="text-xs">{dataUser.email}</p>
              </div>
            </Col>
          </Row>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Link className="text-lg" to={paths.STUDENT_PROFILE}>
          View Profile
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link className="text-lg" to={"/help"}>
          Help
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link className="text-lg" to={"/sendFeedBack"}>
          Send Feedback
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link className="text-lg" to={paths.STUDENT_SUBSCRIPTION}>
          Subscription
        </Link>
      ),
      key: "5",
    },
    {
      label: (
        <Link className="text-lg" to={paths.STUDENT_PURCHASE}>
          Purchase
        </Link>
      ),
      key: "6",
    },
    {
      label: (
        <Link className="text-lg" to={paths.STUDENT_CHANGEPASSWORD}>
          Change Password
        </Link>
      ),
      key: "7",
    },
    {
      label: (
        <p
          onClick={() => logout(navigate)}
          className="text-lg hover:cursor-pointer hover:text-red-600"
        >
          Logout
        </p>
      ),
      key: "8",
    },
  ];

  return (
    <nav className="flex items-center w-full p-2">
      <div className="flex items-center gap-10">
        {!isLoginPage && !isRegisterPage && !isForgotPassword && (
          <div className="md:hidden mt-1">
            <Drawer />
          </div>
        )}
      </div>
      <div className="flex items-center flex-shrink-0">
        <Link to={paths.HOME} className="flex items-center ml-12">
          <img
            src="/logo.jpg"
            alt="FLearn Logo"
            className="w-20 h-auto md:w-24 lg:w-28"
          />
        </Link>
      </div>

      {!isLoginOrRegister &&
        !isForgotPassword &&
        !isLoginPage &&
        !isRegisterPage && (
          <div className="flex-grow flex justify-center">
            <SearchTool />
          </div>
        )}

      <div className="flex items-center flex-shrink-0 gap-5">
        {!user && (
          <div className="text-sm lg:text-base">
            <Link
              to={paths.TEACHING}
              className="whitespace-nowrap overflow-hidden text-ellipsis text-black-500 hover:text-blue-700"
            >
              Be Our Instructor
            </Link>
          </div>
        )}

        {token && (
          <>
            <Popover
              content={
                <PopoverContent
                  totalCost={totalCost}
                  cartsNew={cartsNew}
                  cartsCancel={cartsCancel}
                />
              }
              overlayInnerStyle={{ padding: 0 }}
              trigger="hover"
              placement="bottom"
            >
              <Link to={paths.STUDENT_ENROLLMENT}>
                <Badge className="hidden md:block mr-5">
                  <HeartOutlined className="text-gray-400 text-2xl lg:text-3xl" />
                </Badge>
              </Link>
            </Popover>

            <Popover
              content={
                <PopoverContent
                  totalCost={totalCost}
                  cartsNew={cartsNew}
                  cartsCancel={cartsCancel}
                />
              }
              overlayInnerStyle={{ padding: 0 }}
              trigger="hover"
              placement="bottom"
            >
              <Link to={paths.STUDENT_CART}>
                <Badge count={totalCarts} className="hidden md:block">
                  <ShoppingCartOutlined className="text-gray-400 text-2xl lg:text-3xl mr-5" />
                </Badge>
              </Link>
            </Popover>
          </>
        )}

        {user ? (
          <Dropdown
            className=""
            menu={{ items: dropdownItems }}
            trigger={["click"]}
            overlayClassName="w-64 lg:w-72"
          >
            <p onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  src={dataUser.avatarUrl ? dataUser.avatarUrl : paths.AVATAR}
                  className="hover:cursor-pointer hidden md:block mr-10"
                  size={30}
                  icon={<UserOutlined />}
                />
              </Space>
            </p>
          </Dropdown>
        ) : (
          <Link to={paths.LOGIN}>
            <UserOutlined className="text-gray-400 text-2xl lg:text-3xl cursor-pointer hidden md:block mr-12" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
