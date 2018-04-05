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
                <div><img src={Logo} className='logo'alt="Logo"/></div>
                <div className="nav">
                <Link to={`/Home/:id/:id2`}> <div className='links'>Home</div></Link>
                <Link to={`/pickblog/:id`}><div className='links'>Switch Sites</div></Link>
                <Link to={`/Posts/:id/id2`}><div className='links'>Posts</div></Link>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Header);