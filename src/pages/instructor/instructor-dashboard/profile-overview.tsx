const ProfileOverview = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col gap-1">
          {" "}
          <span>Total subscribers</span>
          <div
            className="flex items-center gap-3
          "
          >
            {" "}
            <h1 className="text-xl">10000</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/10619/10619213.png" width={25} />
          </div>
          <hr className="text-stone-300" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className=" flex justify-between mt-4 items-center">
          <span className="font-bold">Total View</span>
          <div className="flex items-center">
            <span>100.000</span>
            <img src="https://endlessicons.com/wp-content/uploads/2012/11/view-icon-614x460.png" width={40} />
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <span className="font-bold"> Total Purchased</span>
          <div className="flex items-center gap-3">
            <span>75 course</span>
            <img src="https://cdn-icons-png.flaticon.com/512/1011/1011853.png" className="mb-2" width={30} />
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <span className="font-bold">Total Enroll</span>
          <div className="flex items-center gap-3">
            <span>100.000</span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoJ8GzGXZ4yCVy8_726gTpPRCHHtWK3zVw-A&s"
              width={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
