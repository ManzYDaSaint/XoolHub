import './nopage.css';
import React from 'react'
import imgNo from './notFound.svg'
import Buttonee from '../../components/input/button';
import { Link } from 'react-router-dom'

const Nopage = () => {
  return (
    <div className='notFound'>
        <div className="container">
            <img src={imgNo} alt="NotFound"/>
            <div className="conter">
                <h3>Oops!</h3>
                <p>We couldn't find the page you were looking for...</p>
                
                
                <Link to={'/'}>
                    <Buttonee 
                    className={'noPageBtn'}
                    icon={'arrow left'}
                    label={'Go Back'}
                    />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Nopage