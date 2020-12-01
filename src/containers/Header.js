import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Avatar from '@material-ui/core/Avatar';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          error: "",
          password: "",

        }
    }

    componentDidMount () {
    }
    

    render () {
        const user = this.props.user || null;
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Sales Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <Nav className="mr-auto">
                                        <Nav.Link>
                                           Hey, {user.displayName}
                                        </Nav.Link>
                                        <Nav.Link>
                                            <Avatar alt="profile photo" src={user.photoURL} />
                                        </Nav.Link>
                                        <Nav.Link eventKey={2} onSelect={e => this.props.logoutUser()}>
                                            Logout
                                        </Nav.Link>
                                    </Nav>
                                :
                                <Nav.Link onSelect={e => this.props.push('/login')}>Login</Nav.Link>
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;

