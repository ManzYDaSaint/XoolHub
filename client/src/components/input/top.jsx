import React, {useState, useEffect} from 'react'
import Searchbar from './searchbar'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import api from "../../services/apiServices";
import Logo from "../../logo.png";

const Navbar = () => {
    const [logoFile, setLogoFile] = useState(null);

    const fetchData = async () => {
        try {
          const res = await api.getSchool();
          const data = res.data.details;
    
          // If the logo is retrieved as a URL, display it
          if (data.logo) {
            setLogoFile(data.logo); // URL to show the image
          }
        } catch (error) {
          console.error("Error fetching individual:", error);
        }
      };
    
      useEffect(() => {
        fetchData(); // eslint-disable-next-line
      }, []);

  return (
      <div className='navbarContainer'>
        <div className="searchBar">
            <Searchbar 
            icon={'search'}
                type={'text'}
                placeholder={'Type here...'}
            />
        </div>
            <div className="topRight">
                <div className="notify">
                    <Link to={'/notifications'}><Bell size={23} className={'noteIcon'} /> </Link>
                </div>
                <div className="profileContainer">
                    <Link to={'/profile'} className='profileLink'>
                    {logoFile ? (
                              <img src={logoFile} alt="Logo Preview" className="profilePicture" />
                            ) : (
                              <img src={Logo} alt="logo" className="profilePicture" />
                            )}
                    </Link> 
                </div>
            </div>
    </div>
  )
}

export default Navbar