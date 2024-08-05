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
import { logout } from "../../services";
import { getCarts } from "../../services";
import { Cart } from "../../models";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [totalCarts, setTotalCarts] = useState<number>(0);
  const [dataUser, setDataUser] = useState<{
    role: string | null;
    fullName: string | null;
    email: string | null;
    avatarUrl: string | null;
    googleId?: string
  }>({
    role: null,
    fullName: null,
    email: null,
    avatarUrl: null,
  });
  const [cartsNew, setCartsNew] = useState<Cart[]>([]);
  const [cartsCancel, setCartsCancel] = useState<Cart[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : "";

  const isLoginOrRegister =
    location.pathname === paths.LOGIN || location.pathname === paths.REGISTER;
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    if (token) {
      getCart();
    }
    if (user) {
      setDataUser({
        role: userData.role,
        fullName: userData.name,
        email: userData.email,
        avatarUrl: userData.avatar,
        googleId: userData.google_id,
      });
    }
  }, [token, user]);

  const getCart = async () => {
    try {
      const [resNew, resCancel] = await Promise.all([
        getCarts("new"),
        getCarts("cancel"),
      ]);
      let total = 0;

      if (resNew) {
        setCartsNew(resNew);
        total += resNew.reduce(
          (sum: number, cart: Cart) => sum + (cart.price || 0),
          0
        );
      }

      if (resCancel) {
        setCartsCancel(resCancel);
        total += resCancel.reduce(
          (sum: number, cart: Cart) => sum + (cart.price || 0),
          0
        );
      }

      setTotalCost(total);
      setTotalCarts(resNew ? resNew.length : 0);
    } catch (error) {
      console.error("Error fetching cart data:", error);
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
                className="hover:cursor-pointer mt-1 border border-black"
                size={50}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={16} className="pt-3 pr-3">
              <Row>
                <p className="text-lg font-bold">{dataUser.fullName}</p>
              </Row>
              <div>
                <p className="text-sm">{dataUser.email}</p>
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
        <Link className="text-lg" to={paths.STUDENT_PURCHASE}>
          Purchase
        </Link>
      ),
      key: "3",
    },
    ...(dataUser.googleId
      ? []
      : [
        {
          label: (
            <Link className="text-lg" to={paths.STUDENT_CHANGEPASSWORD}>
              Change Password
            </Link>
          ),
          key: "4",
        },
      ]),
    {
      label: (
        <p
          onClick={() => logout(navigate)}
          className="text-lg hover:cursor-pointer hover:text-red-600"
        >
          Logout
        </p>
      ),
      key: "5",
    },
  ];

  return (
    <nav className="flex items-center w-full p-2">
      <div className="flex items-center gap-10">
        {!isLoginPage && !isRegisterPage && (
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
        !isLoginPage &&
        !isRegisterPage && (
          <div className="flex-grow flex justify-center">
            <SearchTool />
          </div>
        )}

      <div className="flex items-center flex-shrink-0 gap-5 mr-10">
        {!user && (
          <div className="text-sm lg:text-base hidden md:block">
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
                <Badge count={totalCarts} className="hidden md:block mr-5">
                  <ShoppingCartOutlined className="text-gray-400 text-3xl" />
                </Badge>
              </Link>
            </Popover>
          </>
        )}

        {user ? (
          <Dropdown
            menu={{ items: dropdownItems }}
            trigger={["click"]}
            overlayClassName="w-72"
          >
            <p onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  src={dataUser.avatarUrl ? dataUser.avatarUrl : paths.AVATAR}
                  className="hover:cursor-pointer hidden md:block border border-black"
                  size={40}
                  icon={<UserOutlined />}
                />
              </Space>
            </p>
          </Dropdown>
        ) : (
          <Link to={paths.LOGIN}>
            <UserOutlined className="text-gray-400 text-3xl cursor-pointer hidden md:block" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
