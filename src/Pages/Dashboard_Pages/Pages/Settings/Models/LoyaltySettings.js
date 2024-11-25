import "./SubModels.css";
import React, { useEffect, useState, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { addData, getData, imageStorageURL } from "../../../../../axiosConfig/API"; 

export default function LoyaltySettings() {
  const [LoyaltySettings, setLoyaltySettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const result = await getData("admin/loyalty-settings");
      setLoyaltySettings(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoyaltySettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSettings = { ...LoyaltySettings };

    try {
        const response = await addData("admin/loyalty-settings", updatedSettings, true);

        if (response.status === "success") {
            Swal.fire("Updated!", response.message, "success");
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
      <div className="title">Loyalty Settings</div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="loyalty_points_expiry_days" className="form-label">
                Loyalty Points Expiry Days <span className="star">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="loyalty_points_expiry_days"
                id="loyalty_points_expiry_days"
                value={LoyaltySettings.loyalty_points_expiry_days}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="loyalty_min_redeem_points" className="form-label">
                Loyalty Min Redeem Points <span className="star">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="loyalty_min_redeem_points"
                id="loyalty_min_redeem_points"
                value={LoyaltySettings.loyalty_min_redeem_points}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="loyalty_max_redeem_points" className="form-label">
                Loyalty Max Redeem Points <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="loyalty_max_redeem_points"
                id="loyalty_max_redeem_points"
                value={LoyaltySettings.loyalty_max_redeem_points}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="loyalty_max_discount_rate" className="form-label">
                Loyalty Max Discount Rate
              </label>
              <input
                type="text"
                className="form-control"
                name="loyalty_max_discount_rate"
                id="loyalty_max_discount_rate"
                value={LoyaltySettings.loyalty_max_discount_rate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="min_order_price_for_points" className="form-label">
                Min Order Price For Points <span className="star">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="min_order_price_for_points"
                id="min_order_price_for_points"
                value={LoyaltySettings.min_order_price_for_points}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Changing the last two fields to text inputs instead of textarea */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="price_per_point" className="form-label">
                Price Per Point
              </label>
              <input
                type="text"
                className="form-control"
                name="price_per_point"
                id="price_per_point"
                value={LoyaltySettings.price_per_point}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="currency_per_point" className="form-label">
                Currency Per Point
              </label>
              <input
                type="text"
                className="form-control"
                name="currency_per_point"
                id="currency_per_point"
                value={LoyaltySettings.currency_per_point}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
