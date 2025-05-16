import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");
    avatarName =
      splitName.length > 1
        ? splitName[0][0] + splitName[1][0]
        : splitName[0][0];
  }

  // Generate a random pastel color
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

  const isOnline = onlineUser.includes(userId);

  return (
    <div
      className="text-slate-800 rounded-full font-bold relative"
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{
            width: width + "px",
            height: height + "px",
            backgroundColor: randomColor,
          }}
          className="overflow-hidden rounded-full flex justify-center items-center text-md uppercase"
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}

      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
