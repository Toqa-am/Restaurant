import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { faSpoon } from "@fortawesome/free-solid-svg-icons";
import { faPooStorm } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
function SideBar() {
  
  return (
    <div className="bg-white sidebar p-2">
      {/* <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">Yousaf</span>
      </div> */}
      {/* <hr className="text-dark" /> */}
      <div className="list-group list-group-flush">
        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faTableColumns} style={{color:"rgb(59, 36, 210)"}} />
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <a href="/dashboard" className="link" style={{color:"rgb(59, 36, 210)"}}>
            Dashboard
          </a>
        </a>
        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faSitemap} style={{ color: 'gray' }} />
          <i className="bi bi-house fs-5 me-3"></i>
          <a href="/items" className="link">
            Items
          </a>
        </a>
        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faSpoon} style={{ color: 'gray' }}/>
          <i className="bi bi-table fs-5 me-3"></i>
          <a href="/dinning" className="link">
            Dinning Table
          </a>
        </a>

   
               <span className="text-black-50">POPS & ORDER</span>


        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faPooStorm} style={{ color: 'gray' }} />

          <i className="bi bi-clipboard-data fs-5 me-3"></i>
          <a href="/pos" className="link">
            POS
          </a>
        </a>
        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faExclamationCircle} style={{ color: 'gray' }} />

          <i className="bi bi-people fs-5 me-3"></i>
          <a href="/posTable" className="link">
            POS Table
          </a>
        </a>
        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faEnvelopeOpenText}  style={{ color: 'gray' }}/>
          <i className="bi bi-power fs-5 me-3"></i>
          <a href="/tableOrder" className="link">Table Order
          </a>
        </a>

             <span className="text-black-50">PROMO</span>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ color: 'gray' }} />
          <i className="bi bi-power fs-5 me-3"></i>
          <a href="/offer" className="link">
            Offer
          </a>
        </a>

       <span className="text-black-50">USERS</span>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faUserTie} style={{ color: 'gray' }}/>
          <i className="bi bi-power fs-5 me-3"></i>

          <a href="/Administrator" className="link">
            Administrator
          </a>
        </a>

        {/* <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faUsers}  />
          <i className="bi bi-power fs-5 me-3"></i>
          <a href="/Customer" className="link">
            Customer
          </a>
        </a> */}

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faUsersGear} style={{ color: 'gray' }}/>
          <i className="bi bi-power fs-5 me-3"></i>

          <a href="/Employee" className="link">
            Employee
          </a>
        </a>

       
               <span className="text-black-50">ACCOUNTS</span>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faFileInvoiceDollar} style={{ color: 'gray' }}/>

          <i className="bi bi-power fs-5 me-3"></i>
          <a href="/Transaction" className="link">
            Transaction
          </a>
        </a>

    
               <span className="text-black-50">REPORT</span>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faFloppyDisk} style={{ color: 'gray' }} />
          <i className="bi bi-power fs-5 me-3"></i>

          <a href="/Transaction" className="link">
            Sales Report
          </a>
        </a>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faSheetPlastic} style={{ color: 'gray' }} />
          <i className="bi bi-power fs-5 me-3"></i>

          <a href="/item" className="link">
            Item Reports
          </a>
        </a>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faCcVisa} style={{ color: 'gray' }}/>

          <i className="bi bi-power fs-5 me-3"></i>

          <a href="/credit" className="link">
            Credit
          </a>
        </a>

             <span className="text-black-50">SETTING</span>

        <a className="list-group-item py-2">
          <FontAwesomeIcon icon={faCog} style={{ color: 'gray' }}/>
          <i className="bi bi-power fs-5 me-3"></i>

          <a href="/setting" className="link">
            Setting
          </a>
        </a>
      </div>
    </div>
  );
}

export default SideBar;
