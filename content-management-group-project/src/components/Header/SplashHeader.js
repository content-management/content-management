import React, {Component} from 'react';
import Logo from "../../assets/images/logo.png";
import '../../styles/css/Header.css';

class SplashHeader extends Component {
    render(){
        return(
            <div>
                <div className="header">
                <div><img src={Logo} className='logo'alt="Logo"/></div>
                </div>
                </div>
        )
    }
}
export default SplashHeader;