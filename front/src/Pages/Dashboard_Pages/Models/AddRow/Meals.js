import "../Models.css";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import { IoAddCircleSharp } from "react-icons/io5";

export default function Meals() {
  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  let maxMum = 0;
  const createPattern = () => {
    if (maxMum < 4) {
      let containerPattern = document.getElementById("containerPattern");

      var group = document.createElement("div");
      group.className = "row group";

      var xMark = document.createElement("div");
      xMark.className = "removeGroup";
      xMark.innerHTML = `<span>✕</span>`;

      xMark.onclick = () => {
        containerPattern.removeChild(group);
        maxMum--;
        if (maxMum < 4) {
          document.querySelector(".errorMaxMan").innerHTML = "";
        } else {
          document.querySelector(".errorMaxMan").innerHTML =
            "maxmam only 4 groups";
        }
      };

      group.appendChild(xMark);

      pattern(group, "price", "Price");
      pattern(group, "size", "Size");
      pattern(group, "number", "Number of pieces");

      containerPattern.appendChild(group);
    } else {
      document.querySelector(".errorMaxMan").innerHTML = "maxmam only 4 groups";
      return;
    }
    maxMum++;
  };

  const pattern = (group, column, label) => {
    var parent = document.createElement("div");

    if (column == "number") {
      parent.className = "col col-12";
    } else {
      parent.className = "col col-6";
    }

    var child = document.createElement("div");
    child.className = "mb-3";

    var labelTag = document.createElement("label");
    labelTag.className = "form-label";
    labelTag.setAttribute("for", column);
    labelTag.innerHTML = label;

    var spanTag = document.createElement("span");
    spanTag.className = "star";
    spanTag.innerHTML = "*";

    labelTag.appendChild(spanTag);
    child.appendChild(labelTag);

    if (column == "size") {
      var selectTag = document.createElement("select");
      const sizes = ["--", "small", "medium", "big", "family"];
      selectTag.className = "form-control";
      selectTag.setAttribute("name", column);
      selectTag.setAttribute("id", column);

      sizes.forEach((option, index) => {
        var optionTag = document.createElement("option");
        optionTag.setAttribute("value", index);
        optionTag.innerHTML = option;
        selectTag.appendChild(optionTag);

        child.appendChild(selectTag);
      });
    } else {
      var inputTag = document.createElement("input");
      inputTag.type = "text";
      inputTag.className = "form-control";
      inputTag.setAttribute("name", column);
      inputTag.setAttribute("id", column);

      child.appendChild(inputTag);
    }

    parent.appendChild(child);
    group.appendChild(parent);
  };

  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>
          <div className="closeSidebar">
            <FaXmark onClick={closeModel} />
          </div>
        </div>

        <div className="newColumn">
          <button
            type="button"
            className="addNewColumn"
            onClick={() => createPattern()}
          >
            <IoAddCircleSharp />
            <span className="ps-2">add column</span>
          </button>
          <label className="errorMaxMan"></label>
        </div>

        <div className="modal-content">
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label for="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="category" className="form-label">
                    category <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    id="category"
                  >
                    <option value="-1">...</option>
                    <option value="1">cate 1</option>
                    <option value="2">cate 2</option>
                    <option value="3">cate 3</option>
                    <option value="4">cate 4</option>
                  </select>
                </div>
              </div>

              <div className="row" id="containerPattern"></div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="image" className="form-label">
                    image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="item_type" className="form-label">
                    type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="item_type"
                        required
                      />
                      <span>veg</span>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="item_type"
                        required
                      />
                      <span>non veg</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label for="description" className="form-label">
                    description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                  ></textarea>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="status" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input type="radio" name="status" id="status" required />
                      <span>active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input type="radio" name="status" id="status" required />
                      <span>in active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModel}
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
