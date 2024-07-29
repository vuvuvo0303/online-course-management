import React, { useEffect, useState } from "react";
import { Card, Avatar, Rate, Button, Badge } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getItemsBySubscriber } from "../../../services/subscription";
import { Subscription } from "models/Subscription";
import { format } from "date-fns";

const TeacherCategories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Subscription[]>([]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Fetch data from API
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await getItemsBySubscriber("", 1, 10); // Điều chỉnh keyword, pageNum và pageSize theo nhu cầu
      console.log(res);
      setTeachers(res);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Hiển thị trạng thái loading
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2 p-2">Instructors Subscribed</h2>
      <p className="text-gray-600 mb-4 p-2">List of Instructors Subscribed.</p>
      <Carousel
        responsive={responsive}
        itemClass="carousel-item-padding-10px"
        swipeable={true}
        draggable={false}
        showDots={false}
        arrows={true}
        centerMode={false}
        infinite={true}
      >
        {teachers.map((teacher) => (
          <div key={teacher._id} className="w-full">
            <Badge.Ribbon
              text={teacher.is_subscribed ? "Subscribed" : "Not subscribed"}
              color={teacher.is_subscribed ? "red" : "blue"}
            >
              <Card className="bg-lightgoldenrodyellow rounded-lg shadow-md p-4 max-h-[15rem]">
                <div className="flex items-center">
                  {/* <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${teacher._id}`}
                  alt="avatar"
                  className="rounded-full w-12 h-12 mr-4"
                /> */}
                  <div>
                    <h3 className="text-lg font-bold">{teacher.instructor_name}</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm">
                  Subscribed Date: {format(new Date(teacher.created_at), 'dd/MM/yyyy')}
                  </p>
                  <p className="text-gray-600 text-sm">
                  Subscribed Date: {format(new Date(teacher.updated_at), 'dd/MM/yyyy')}
                  </p>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TeacherCategories;
