import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import '../../styles/css/Header.css';



class Header extends Component {
    render(){
        return(
            <div>
                <div className="header">
                <div><img src={Logo} className='logo'alt="Logo" height='100px' width='100px'/></div>
                </div>
            </div>
        )
    }
}

export default Header;