import React from 'react'
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react'
import api from '../services/apiServices'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LogOut({ open, setOpen }) {
    const navigate = useNavigate();
    
    const handleLogOut = async() => {
        const res = await api.Logout();
        if(res.data.success === true) {
            toast.success(res.data.message);

            setTimeout(() => {
                navigate('/');
            }, 1000);
            return;
        }
    }

  return (
        <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        centered={true}
        >
        <Header icon className='hov'>
            <Icon name='shutdown' />
            Logging Out
        </Header>
        <ModalContent>
            <p>
            Are you sure want to log out? All your <br /> unsaved data will be lost.
            </p>
        </ModalContent>
        <ModalActions>
            <Button basic color='green' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
            </Button>
            <Button color='red' inverted onClick={handleLogOut}>
                <Icon name='shutdown' /> Log Out
            </Button>
        </ModalActions>
        </Modal>
  )
}

export default LogOut