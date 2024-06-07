import React from 'react'
import NavDashboard from './NavDashboard';
import SideBar from './SideBar';
// import ContentDashboard from './ContentDashboard';
import Items from '../Pages/Items'
export default function Dashboard() {
  return (
    <div className='ful'>
          <NavDashboard />
          <div className='container-fluid'>
              <div className='row'>
                <div className='col-2'>
                    <SideBar></SideBar>
                </div>

                  <div className='col-10' style={{backgroundColor:""}}>
                      {/* <ContentDashboard/> */}
                      <Items/>
                </div>
              </div>
              </div>
    </div>
  )
}
