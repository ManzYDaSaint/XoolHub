import React, {useState} from 'react'
import Searchbar from './searchbar'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import LogOut from '../../pages/logout'

const Navbar = () => {
    const [open, setOpen] = useState(false);

  return (
      <div className='navbarContainer'>
        <LogOut open={open} setOpen={setOpen} />
        <div className="searchBar">
            <Searchbar 
            icon={'search'}
                type={'text'}
                placeholder={'Type here...'}
            />
        </div>
        <div className="notificationBar">
            <ul>
                <Link to={'/contact'} className='topItem'>
                    <li >Contact US</li>
                </Link>
                <Link to={'/support'} className='topItem'>
                    <li >Support Team</li>
                </Link>
            </ul>
            <div className="topRight">
                <div className="notify">
                    <Link to={'/messages'} className='notifyLink'><Icon name='mail' className='noteIcon'/></Link>
                    <Link to={'/notifications'} className='notifyLink'><Icon name='bell' className='noteIcon'/></Link>
                </div>
                <div className="profileContainer">
                    <Link to={'/profile'} className='profileLink'><Icon name='user circle' className='profilePicture' /></Link> 
                </div>
                <button onClick={() => setOpen(true)}>
                    <Icon name='shutdown' />
                    
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar