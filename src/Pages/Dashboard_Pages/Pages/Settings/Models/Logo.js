import "./SubModels.css";
import React, { useEffect, useState, useCallback } from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { addData, getData, imageStorageURL } from "../../../../../axiosConfig/API";
import { Tabs } from "antd";
import { FaImage } from "react-icons/fa6";
import UploadImage from "../../Actions/UploadImage";

export default function Logo() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch settings data
  const fetchSettings = useCallback(async () => {
    try {
      const result = await getData("admin/settings/logo");
      setSettings(result);
      // console.log(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (settings.logo && settings.logo instanceof File) {
      formData.append("logo", settings.logo);
    }

    try {
      const response = await addData("admin/settings", formData, true);

      if (response.status === "success") {
        Swal.fire("Updated!", response.message, "success");
        fetchSettings(); // Refresh data after saving
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AddTable">
      {/* <div className="title">Restaurant Logo</div> */}

      {/* Display the current logo */}
      {/* {settings.logo && (
        <div className="logo-container">
          <img
            src={`${imageStorageURL}/${settings.logo}`}
            alt="Restaurant Logo"
            className="logo"
            width={150}
            height="auto"
          />
        </div>
      )} */}

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <FaImage />
              Logo
            </span>
          }
          key="1"
        >
          <UploadImage url={`admin/settings/logo`} data={settings} onUploadSuccess={fetchSettings} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
