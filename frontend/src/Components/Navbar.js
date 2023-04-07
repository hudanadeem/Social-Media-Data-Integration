import React, {useState, useEffect}from 'react'
import {Link} from 'react-router-dom'
import { Button } from './Button';
import DarkMode from './DarkMode';
// import '../index.css'
import './Navbar.css';


function Navbar(props){

    const [click, setClick] = useState(false);
    const[button,setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    },[]);

    window.addEventListener('resize', showButton);

    const { isSplit, toggleSplitScreen } = props;

    return(
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        Mass Destruction
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active': 'nav-menu'}>
                        <li className = 'nav-item'>
                            <Link to='/' className='nav-links' onClick = {closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                            <button buttonStyle='btn--outline' onClick={toggleSplitScreen}>
                                {isSplit ? "Data all together" : "Seperate Data"}
                            </button>
                            <DarkMode/>
                        <li>
                            <Link to='/sign-ip' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign In
                            </Link>
                        </li>                        
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
                    {/* {button && <Button buttonStyle='btn--outline'>Dark Mode</Button>} */}

                </div>
            </nav>
        </>
    );
}

export default Navbar