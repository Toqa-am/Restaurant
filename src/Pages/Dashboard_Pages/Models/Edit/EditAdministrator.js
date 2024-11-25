import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditAdministrator({
  visible,
  visibleToggle,
  item,
  updated,
}) {
  const [administrator, setAdministrator] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setErrors] = useState([]);
  useEffect(() => {
    if (item) setAdministrator(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAdministrator((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", administrator.name);
    formData.append("email", administrator.email);
    formData.append("Role", administrator.role);
    formData.append("phone", administrator.phone);
    formData.append("password", administrator.password);
    formData.append(
      "password_confirmation",
      administrator.password_confirmation
    );
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `admin/employees/${item.id}`,
        formData,
        false
      );

      if (response.status === "success") {
        updated();
        setErrors([]);
        setTimeout(() => {
          Swal.fire("Updated!", response.message, "success");
        }, 250);
      }
    } catch (error) {
      setErrors(error.response?.data?.errors);
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <div id="AddTable" className={visible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            edit {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>
          <div className="closeSidebar">
            <HiXMark onClick={visibleToggle} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={administrator.name}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.name && <div className="invalid-data">{error.name}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={administrator.email}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.email && <div className="invalid-data">{error.email}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    role
                  </label>
                  <select
                    className="form-control"
                    name="role"
                    id="role"
                    value={administrator.role}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="admin">admin</option>
                    <option value="casher">casher</option>
                    <option value="chef">chef</option>
                  </select>
                  {error?.role && <div className="invalid-data">{error.role}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={administrator.phone}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.phone && <div className="invalid-data">{error.phone}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    id="password"
                    value={administrator.password}
                    onChange={(e) => handleChange(e)}
                  />
                  {error?.password && <div className="invalid-data">{error.password}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    password confirmation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={administrator.password_confirmation}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error?.password_confirmation && <div className="invalid-data">{error.password_confirmation}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">update</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={visibleToggle}
                >
                  <HiXMark />
                  <span className="ps-2">close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
