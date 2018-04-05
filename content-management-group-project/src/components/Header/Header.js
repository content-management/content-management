import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux"; //connect to redux
import { getUser } from "../../ducks/reducer"; //get user from redux
import Logo from "../../assets/images/logo.png";
import '../../styles/css/Header.css';



class Header extends Component {
    render(){
        return(
            <div>
                <div className="header">
                <Link  to={`/Home/${this.props.user.name}`}>
                <div><img src={Logo} className='logo'alt="Logo" height='100px' width='100px'/></div>
                </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Header);