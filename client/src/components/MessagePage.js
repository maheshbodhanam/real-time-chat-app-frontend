import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiReply, BiTrash } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../API/apiRequest";
import Avatar from "./Avatar";
import Button from "./Button";
import { DecryptMessage, EncryptMessage } from "./EncryptAndDecrypt";
import Loading from "./Loading";
import Modal from "./Modal";

const MessagePage = () => {
  const navigate = useNavigate();

  const params = useParams();

  const currentMessage = useRef(null);

  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  const [replyingTo, setReplyingTo] = useState(null);
  const [allMessage, setAllMessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "" });
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    online: false,
    _id: "",
  });

  const handleReplyMessage = (msg) => {
    setReplyingTo(msg);
  };

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessage]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.emit("seen", params.userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      socketConnection.on("message", (data) => {
        setAllMessage(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  const handleOnChange = (e) => {
    const { value } = e.target;

    setMessage((prev) => ({ ...prev, text: value }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user?._id,
          receiver: params.userId,
          text: EncryptMessage(`${message.text}`),
          msgByUserId: user?._id,
          replyTo: replyingTo ? replyingTo?._id : null,
        });
        setMessage({ text: "" });
        setReplyingTo(null);
      }
    }
  };

  const handleDeleteConversation = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/delete-conversation`;
    try {
      const res = await apiRequest(
        {
          method: "DELETE",
          url: URL,
          data: { sender: user?._id, receiver: params?.userId },
        },
        setLoading
      );

      if (res?.success) {
        socketConnection.emit("sidebar", user._id);
        toast.success(res.msg);
        navigate("/");
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      toast.error("Error deleting conversation!");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteMsg = async (msgId) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/delete-msg`;
    try {
      const res = await apiRequest(
        {
          method: "DELETE",
          url: URL,
          data: { msgId: msgId, sender: user?._id, receiver: params?.userId },
        },
        setLoading
      );

      if (res?.success) {
        socketConnection.emit("sidebar", user._id);

        socketConnection.emit("message-page", params.userId);
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      toast.error("Error deleting msg!");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-16 bg-white flex justify-between items-center px-4 shadow">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={40}
              height={40}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

        <BiTrash
          title="Delete conversation"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer"
        />
      </header>

      <section className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-200  px-2 py-2 relative">
        <div className="flex flex-col gap-2" ref={currentMessage}>
          {allMessage.map((msg, index) => (
            <div
              key={index}
              className={`${
                user._id === msg?.msgByUserId ? "ml-auto " : "mr-auto"
              } p-2 py-1 rounded items-center flex gap-2 relative group
              `}
            >
              {user._id === msg?.msgByUserId && (
                <div className="hidden group-hover:flex gap-2">
                  <BiReply
                    className="cursor-pointer"
                    onClick={() => handleReplyMessage(msg)}
                  />
                  <BiTrash
                    onClick={() => handleDeleteMsg(msg?._id)}
                    className="cursor-pointer"
                  />
                </div>
              )}
              <div
                className={`p-1 rounded ${
                  user._id === msg?.msgByUserId
                    ? "ml-auto bg-cyan-500 text-white"
                    : "bg-white"
                }`}
              >
                {msg.replyTo && (
                  <div className="text-sm max-w-[60vw] break-words text-gray-600 bg-gray-200 p-2 rounded">
                    <p className="text-orange-600 capitalize   font-semibold">
                      {allMessage.find((m) => m._id === msg.replyTo)
                        ?.msgByUserId
                        ? dataUser._id ===
                          allMessage.find((m) => m._id === msg.replyTo)
                            ?.msgByUserId
                          ? dataUser?.name
                          : "You"
                        : ""}
                    </p>
                    <p>
                      {allMessage.find((m) => m._id === msg.replyTo)?.text
                        ? DecryptMessage(
                            allMessage.find((m) => m._id === msg.replyTo)?.text
                          )
                        : "Deleted message"}
                    </p>
                  </div>
                )}
                <p className="px-2 max-w-[60vw] text-sm break-words">
                  {DecryptMessage(`${msg.text}`)}
                </p>
                <p className="text-xs ml-auto w-fit">
                  {moment(msg.createdAt).format("hh:mm A")}
                </p>
              </div>
              {user._id !== msg?.msgByUserId && (
                <div className="hidden group-hover:flex gap-2">
                  <BiTrash
                    onClick={() => handleDeleteMsg(msg?._id)}
                    className="cursor-pointer"
                  />
                  <BiReply
                    className="cursor-pointer"
                    onClick={() => handleReplyMessage(msg)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <form
        className="h-fit w-full flex flex-col gap-2 bg-white p-1 shadow-md"
        onSubmit={handleSendMessage}
      >
        {replyingTo && (
          <div className="bg-gray-200 break-words w-full relative p-2 rounded text-sm mb-1">
            <p className="text-orange-600 font-semibold">
              {dataUser._id ===
              allMessage.find((m) => m._id === replyingTo?._id)?.msgByUserId
                ? dataUser?.name
                : "You"}
            </p>
            <p className="w-[70vw] break-words ">
              {DecryptMessage(replyingTo.text)}
            </p>
            <IoClose
              size={20}
              onClick={() => setReplyingTo(null)}
              className="cursor-pointer absolute top-1 right-1"
            />
          </div>
        )}

        <div className="flex gap-2">
          <textarea
            type="textfield"
            placeholder="Type your message..."
            className="py-1 max-h-32 min-h-8 px-4 outline-none w-full rounded-md shadow-sm border border-slate-300"
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="text-[#F07023] hover:text-[#f4955a]">
            <IoMdSend size={28} />
          </button>
        </div>
      </form>

      {loading && <Loading />}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Are you sure want to delete?"
      >
        <p>Everithing will be deleted!</p>

        <div className="ml-auto mt-4">
          <Button
            label="Yes"
            onClick={handleDeleteConversation}
            variant="primary"
          />
          <Button
            label="No"
            onClick={() => setIsModalOpen(false)}
            variant="secondary"
            className="ml-4"
          />
        </div>
      </Modal>
    </div>
  );
};

export default MessagePage;
