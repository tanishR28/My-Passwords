import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import copyLogo from "../assets/copy.svg";
import eye from "../assets/eye.png";
import hidden from "../assets/hidden.png";

import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
const Manager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
const handleShowPass = () => {
  setIsVisible(prev => !prev);
};


  const getPasswords = async () => {
    const req = await fetch("http://localhost:3000/");
    let passwordsMongo = await req.json();
    console.log(passwordsMongo);
    setpasswordArray(passwordsMongo);
  };

  useEffect(() => {
    getPasswords();
  }, []);
  let passRef = useRef();
  let showPassRef = useRef();
  const [editId, seteditId] = useState("");
  const handleChangeForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  function copyToast() {
    toast.success("Copied!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const savePassword = async () => {
    if (!form.url.trim() || !form.username.trim() || !form.password.trim()) {
      toast.warn("All fields must be filled to save record.");
      return;
    }
    if (editId) {
      let editedPasswordsArr = passwordArray.map((item) => {
        return item.id === editId ? { ...form, id: editId } : item;
      });
      setpasswordArray(editedPasswordsArr);
      let res = await fetch("http://localhost:3000/", {
        method: "PUT", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify({ ...form, id: editId }), // Convert the JavaScript object to a JSON string
      });
      await getPasswords(); // ✅ force refresh

      setform({ url: "", username: "", password: "" });
      seteditId("");
    } else {
      let newId = uuidv4();
      let newPasswordsArr = [...passwordArray, { ...form, id: newId }];
      setpasswordArray(newPasswordsArr);
      setform({ url: "", username: "", password: "" });
      let res = await fetch("http://localhost:3000/", {
        method: "POST", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify({ ...form, id: newId }), // Convert the JavaScript object to a JSON string
      });
    }
  };
  const editRecord = (id) => {
    let record = passwordArray.filter((item) => item.id === id);
    setform(record[0]);
    seteditId(id);
  };
  const deleteRecord = async (id) => {
    console.log("deleting record with id: " + id);
    let c = window.confirm("Do you really want to delete this record?");
    if (c) {
      //i.e true
      let newPasswordsArr = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(newPasswordsArr);
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE", // Specify the HTTP method as DELETE
        headers: {
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify({ id }), // Convert the JavaScript object to a JSON string
      });
      toast("✅ Record Deleted");
    }
  };
  return (
    <div className="flex justify-center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container  absolute pt-18 pb-20 w-[90vw]  z-[-2] bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
        <div className="heading flex flex-col w-full items-center my-10">
          <span className="scale-200 ">
            <Logo color="text-green-800" />
          </span>
          <div className="text-[12px] mt-4">Your Safest Password Manager</div>
        </div>
        <div className="w-[80%] flex flex-col mx-auto gap-6">
          <input
            onChange={handleChangeForm}
            value={form.url}
            placeholder="Enter Website URL"
            className="py-1 px-4  border-2 border-green-500 rounded-2xl w-full"
            type="text"
            name="url"
          />
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <input
              onChange={handleChangeForm}
              value={form.username}
              placeholder="Enter Username"
              className="py-1 px-4 border-2 border-green-500 rounded-2xl md:w-3/4"
              type="text"
              name="username"
            />
            <div className="pass md:w-1/3 relative">
              <input
                onChange={handleChangeForm}
                value={form.password}
                placeholder="Enter Password"
                className="w-full py-1 px-4 border-2 border-green-500 rounded-2xl"
                type={isVisible ? "text" : "password"}
                name="password"
              />
              <span
                onClick={handleShowPass}
                className="cursor-pointer absolute right-5 top-1.5 size-6"
              >
                <img src={isVisible ? eye : hidden} alt="toggle password" />
              </span>

            </div>
          </div>
        </div>
        <div className="saveBtn">
          <button
            onClick={savePassword}
            className=" flex justify-center my-5 mt-8 mx-auto border-1 cursor-pointer hover:bg-green-400 active:scale-100 hover:scale-105 transition-all duration-300 border-black rounded-[10px] w-[40%] md:w-[15%] bg-green-500 px-12 py-2 relative"
          >
            {editId ? "Edit" : "Save"}
            <lord-icon
              className="h-0 md:h-[60%] px-1 absolute right-[7%]"
              src="https://cdn.lordicon.com/fjvfsqea.json"
              trigger="hover"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
          </button>
          {/* <button onClick={()=>{console.log(passwordArray);
      }} className=" flex justify-center my-5 mx-auto border-1 cursor-pointer hover:bg-green-400 hover:scale-105 transition-all duration-300 border-black rounded-[10px] w-[15%] bg-green-500 px-12 py-2 relative">
            show pass
        
          </button> */}
        </div>
        <div className="passHeading flex justify-center">
          <h1 className="md:w-[80%] font-bold text-2xl mb-5">Your Passwords</h1>
        </div>
        <div className="passwordsData w-[100%] flex justify-center">
          {passwordArray.filter(
            (item) => item.url || item.password || item.username
          ).length === 0 ? (
            <div>No Passwords to Display</div>
          ) : (
            <table className="table-auto bg-green-100 w-[70%] rounded-[7px] overflow-hidden">
              <thead className="bg-green-700 rounded-2xl text-white">
                <tr>
                  <th className="py-2  w-[30%]">Website URLs</th>
                  <th className="py-2  w-[30%]">Username/Email</th>
                  <th className="py-2  w-[25%]">Password</th>
                  <th className="py-2  w-[25%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  if (!item.url && !item.password && !item.username)
                    return null;
                  return (
                    <tr key={index}>
                      {/* URL Cell */}
                      <td className="group relative text-center py-1 border border-white">
                        <a
                          href={item.url}
                          className="hover:text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.url}
                        </a>
                        <img
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            copyToast();
                          }}
                          src={copyLogo}
                          alt="copy"
                          className="w-4 absolute right-4 top-2 opacity-0 group-hover:opacity-100 transition-transform duration-100 hover:scale-115"
                        />
                      </td>

                      {/* Username Cell */}
                      <td className="group relative text-center py-1 border border-white">
                        {item.username}
                        <img
                          onClick={() => {
                            navigator.clipboard.writeText(item.username);
                            copyToast();
                          }}
                          src={copyLogo}
                          alt="copy"
                          className="w-4 absolute right-4 top-2 opacity-0 group-hover:opacity-100 transition-transform duration-100 hover:scale-115"
                        />
                      </td>

                      {/* Password Cell */}
                      <td className="group relative text-center py-1 border border-white">
                         {"*".repeat(item.password.length)}
                        <img
                          onClick={() => {
                            navigator.clipboard.writeText(item.password);
                            copyToast();
                          }}
                          src={copyLogo}
                          alt="copy"
                          className="w-4 absolute right-4 top-2 opacity-0 group-hover:opacity-100 transition-transform duration-100 hover:scale-115"
                        />
                      </td>
                      <td className="group relative text-center py-1 border border-white">
                        <div className="flex gap-2.5 justify-center">
                          <lord-icon
                            onClick={() => editRecord(item.id)}
                            className=" edit hover:scale-110 active:scale-100"
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="click"
                            stroke="bold"
                            style={{ width: "22px", height: "22px" }}
                          ></lord-icon>
                          <lord-icon
                            onClick={() => deleteRecord(item.id)}
                            className="delete hover:scale-110 active:scale-100"
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="click"
                            stroke="bold"
                            style={{ width: "22px", height: "22px " }}
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
