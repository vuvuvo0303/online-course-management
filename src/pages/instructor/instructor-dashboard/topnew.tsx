import { Image, Tabs, TabsProps } from "antd";
import { Link } from "react-router-dom";

const TopNews = () => {

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex px-3">
          {" "}
          <span className="mr-3">Top 1</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7-SC5QPJwFZnoAbaQhZxqjXC-6_YB88qleg&s"
            width={20}
          />
        </div>
      ),
      children: (
        <div>
          <div>
            <Image
              src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/8/14/941762/_DSC1981.jpeg"
              width={350}
            />
          </div>
          <div className="flex flex-col justify-between h-full   ">
            <span className="text-xl font-bold text-gray-800">FSA welcomes interns for the Sum24 semester</span>
            <span className="text-gray-600 mt-2 flex-grow">
              The FSA welcomes interns for the Summer 2024 semester, offering valuable hands-on experience, professional
              development opportunities, and a chance to contribute to impactful projects in a dynamic environment. Join
              us to advance your career!
            </span>
            <div className="mt-4 flex justify-end">
              <Link to={""}> <span className="text-blue-500 hover:cursor-pointer">See more</span></Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center px-3">
          <span className="mr-3">Top 2</span>
          <img src="https://grin2b.com/wp-content/uploads/2017/01/Grin2B_icon_NEWS.png" width={30} />
        </div>
      ),
      children: (
        <div>
          <div>
            <Image src="https://letdiv.com/wp-content/uploads/2024/04/khoa-hoc-react.png" width={350} />
          </div>
          <div className="flex flex-col justify-between h-full   ">
            <span className="text-xl font-bold text-gray-800">Why should students learn reactjs?</span>
            <span className="text-gray-600 mt-2 flex-grow">
              Students should learn ReactJS to master modern web development with a component-based approach, gaining
              skills in building interactive user interfaces efficiently using JavaScript. It enhances career prospects
              by aligning with industry demand for front-end developers.
            </span>
            <div className="mt-4 flex justify-end">
              <Link to={""}> <span className="text-blue-500 hover:cursor-pointer">See more</span></Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className=" flex px-2">
          <span className="mr-3">Top 3</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyfawr596hP1MRIza7PyK1ruOvBlV7QYrHYw&s"
            width={25}
          />
        </div>
      ),
      children: (
        <div>
          <div>
            <Image src="https://vtiacademy.edu.vn/upload/images/khoa-hoc-ba.jpg" width={350} />
          </div>
          <div className="flex flex-col justify-between h-full   ">
            <span className="text-xl font-bold text-gray-800">Why should I study BA?</span>
            <span className="text-gray-600 mt-2 flex-grow">
              Studying a BA offers critical thinking skills, cultural understanding, and communication abilities
              essential for diverse careers in fields such as education, journalism, and public service.
            </span>
            <div className="mt-4 flex justify-end">
              <Link to={""}> <span className="text-blue-500 hover:cursor-pointer">See more</span></Link>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default TopNews;
