import Image from "next/image";

const Message = ({ children, avatar, username, description }) => {
  return (
    <div className="bg-white p-8 border-2 rounded-lg drop-shadow my-4">
      <div className="flex items-center gap-2">
        <img
          className="w-16 rounded-full cursor-pointer "
          src={avatar}
          alt={username + "_dp"}
          // width={60}
          // height={60}
        />
        <div className="px-4">
          <h2 className="font-bold">{username}</h2>
          <p className="text-gray-700 ">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Message;
