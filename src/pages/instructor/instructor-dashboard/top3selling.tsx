
import { Image, Rate, Tabs, TabsProps } from "antd";
import { Link } from "react-router-dom";
import top1 from "../../../assets/top1.png";
import top2 from "../../../assets/top2.png";
import top3 from "../../../assets/top3.png";
const TopSelling = () => {

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (

        <div className="flex px-3">
          {" "}
          <span className="mr-3">Top 1</span>
          <img src={top1} width={25} />
        </div>

      ),
      children: (
        <div>
          {" "}
          <div>
            <h1 className=" text-yellow-400 py-6">TailWind Course</h1>
          </div>
          <div className="flex gap-5 items-center">
            <Image
              src="https://th.bing.com/th/id/OIP.AvpmhSP2e8GguzR4CUT5dQHaEy?rs=1&pid=ImgDetMainhttps://th.bing.com/th/id/OIP.AvpmhSP2e8GguzR4CUT5dQHaEy?rs=1&pid=ImgDetMain"
              width={150}
              height={100}
            />
            <div className="gap-7">
              <p className="text-gray-700 ">
                Instructor: <Link to={""}>Vinh NV</Link>
              </p>
              <p className="text-gray-700 ">Price: 10000</p>
              <p className="text-gray-700 ">
                Category: <Link to={""}>Frontend</Link>
              </p>
              <p className="text-gray-700">Total sold: 140 courses</p>
            </div>
          </div>
          <div className="flex flex-col mt-auto">
            <Rate allowHalf defaultValue={4.5} className="mt-3 ml-3" />
            <div className="py-2 flex justify-end">
              <span className="text-blue-500 cursor-pointer">See More</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (

        <div className="flex px-3">
          <span className="mr-3">Top 2</span>
          <img src={top2} width={30} />
        </div>

      ),
      children: (
        <div>
          <div>
            <h1 className=" text-stone-500 py-6">Reactjs Course</h1>
          </div>
          <div className="flex gap-5 items-center">
            <Image
              src="https://th.bing.com/th/id/OIP.GZUY5_68fSQ5j1_x0vfexgHaEK?rs=1&pid=ImgDetMain"
              width={150}
              height={100}
            />
            <div className="gap-7">
              <p className="text-gray-700 ">
                Instructor: <Link to={""}>Tript</Link>
              </p>
              <p className="text-gray-700 ">Price: 100000</p>
              <p className="text-gray-700 ">
                Category: <Link to={""}>Frontend</Link>
              </p>
              <p className="text-gray-700">Total sold: 150 courses</p>
            </div>
          </div>
          <div className="flex flex-col mt-auto">
            <Rate allowHalf defaultValue={5} className="mt-3 ml-3" />
            <div className="py-2 flex justify-end">
              <span className="text-blue-500 cursor-pointer">See More</span>
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
          <img src={top3} width={25} />
        </div>
      ),
      children: (
        <div>
          <div>
            <h1 className=" text-amber-700 py-6">Antd Course</h1>
          </div>
          <div className="flex gap-5 items-center">
            <Image src="https://pic1.zhimg.com/v2-fd3257bb65fceb34187ae9298fd241d5_b.jpg" width={150} height={100} />
            <div className="gap-7">
              <p className="text-gray-700 ">
                Instructor:<Link to={""}>Khanh KT</Link>
              </p>
              <p className="text-gray-700 ">Price: 100000</p>
              <p className="text-gray-700 ">
                Category: <Link to={""}>Frontend</Link>
              </p>
              <p className="text-gray-700">Total sell: 100 courses</p>
            </div>
          </div>
          <div className="flex flex-col mt-auto">
            <Rate allowHalf defaultValue={4} className="mt-3 ml-3" />
            <div className="py-2 flex justify-end">
              <span className="text-blue-500 cursor-pointer">See More</span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div><Tabs defaultActiveKey="1" items={items} /></div>
  )
}

export default TopSelling