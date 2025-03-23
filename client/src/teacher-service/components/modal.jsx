import React from 'react'
import api from '../../services/apiServices'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LogOutModal({ open, setOpen }) {
    const navigate = useNavigate();
    
    const handleLogOut = async() => {
        const res = await api.tLogout();
        if(res.data.success === true) {
            toast.success(res.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 1000);
            return;
        }
    }

  return (
        <div className={`fixed inset-0 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V5h2v6z"/></svg>
                    <h2 className="text-lg font-semibold ml-2">Logging Out</h2>
                </div>
                <div className="mb-4">
                    <p className='text-center'>
                    Are you sure want to log out? All your <br /> unsaved data will be lost.
                    </p>
                </div>
                <div className="flex justify-between">
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setOpen(false)}>
                        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V5h2v6z"/></svg>
                        No
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogOut}>
                        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V5h2v6z"/></svg>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
  )
}

export default LogOutModal