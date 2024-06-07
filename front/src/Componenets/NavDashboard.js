import React from 'react';
import user from '../usre.png'; // Update the path as per your project structure
import logo from '../logo.png'; // Update the path as per your project structure
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowDown, faGlobe ,faPeopleRoof } from '@fortawesome/free-solid-svg-icons';

function NavDashboard() {
    return (
        <Navbar expand="lg" variant="light" style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="container-fluid">
                <Navbar.Brand href="#">
                    <img src={logo} alt="Logo" height="30" />
                </Navbar.Brand>

                <Nav className="ml-auto" style={{ alignItems: 'center' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="branch-selector" style={{ textDecoration: 'none' }}>
                             <FontAwesomeIcon icon={faPeopleRoof} style={{marginRight:'5px'}}/>
                           <span style={{color :'black', padding:'5px'}}>Branch</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#branch1">Branch</Dropdown.Item>
                            <Dropdown.Item href="#branch2">Manager</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="link" id="language-selector" style={{ textDecoration: 'none' }}>
                            <FontAwesomeIcon icon={faGlobe} /> <span style={{color :'black'}}>English</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item href="#english" style={{color:'black'}}>English</Dropdown.Item>
                            <Dropdown.Item href="#spanish" style={{color:'black'}}>Spanish</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Nav.Link href="#" style={{ display: "flex", alignItems: "center" }}>
                        {/* <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} /> */}
                        <img src={user} alt="Logo" height="30" />
                        <span style={{margin:'5px'}}>Hello,</span> <span style={{ color: "blue", fontWeight: "bold", marginLeft: "6px" }}>John Doe</span>
                        <FontAwesomeIcon icon={faArrowDown} style={{ marginLeft: '6px', height: "12px" }} />
                    </Nav.Link>
                </Nav>
            </div>
        </Navbar>
    );
}

export default NavDashboard;
