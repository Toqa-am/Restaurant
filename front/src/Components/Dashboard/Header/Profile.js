import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import profile from "../../../assets/global/profile.png";

export default function Profile() {
  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");

    if (element === "sidebar") {
      var container = document.getElementById("container");
      container.classList.toggle("full-width");
    }
  };

  const closeProfileModal = () => {
    var profile = document.getElementById("profile");
    profile.classList.remove("show");
  };
  const history = useHistory();

  const handleToken = () => {
    let Loader = document.getElementById("Loader");
    if (Loader) {
      Loader.classList.add("show");
      setTimeout(() => {
        Loader.classList.remove("show");
        localStorage.removeItem("token_foodScan");
        history.push("/auth/login");
      }, 2000);
    }
  };

  return (
    <div className="dropdown profile">
      <button
        className="dropdown-toggle"
        onClick={() => handleToggleClass("profile")}
      >
        <img src={profile} alt="avatar" />
        <div className="details">
          <span>Hello</span>
          <span>User</span>
        </div>
      </button>
      <ul className="dropdown-menu" id="profile">
        <div className="user">
          <div className="image">
            <img src={profile} alt="user image" />

            <form className="input-file">
              <input
                type="file"
                name="image"
                id="file-input"
                className="file-input"
              />
              <label for="file-input">
                <AiFillEdit />
              </label>
            </form>
          </div>

          <ul>
            <li>user</li>
            <li>user@gmail.com</li>
            <li>+4546454455</li>
          </ul>
        </div>

        <ul className="group">
          <li className="item" onClick={() => closeProfileModal()}>
            <Link to="/admin/dashboard/edit/profile">
              <FiEdit />
              <span>edit profile</span>
            </Link>
          </li>
          <li className="item" onClick={() => closeProfileModal()}>
            <Link to="/admin/dashboard/change/email">
              <MdEmail />
              <span>change email</span>
            </Link>
          </li>
          <li className="item" onClick={() => closeProfileModal()}>
            <Link to="/admin/dashboard/change/password">
              <IoKeyOutline />
              <span>change password</span>
            </Link>
          </li>
          <li className="item" onClick={handleToken}>
            <Link to="#">
              <CiLogout />
              <span>logout</span>
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
}
