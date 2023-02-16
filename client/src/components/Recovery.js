import React from 'react'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'

function Recovery() {
 
  return (
  <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Recovery</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Enter the OTP to recover password.
          </span>
        </div>

        <form className='pt-20' >
            

            <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center">
                  <span className='py-4 text-m text-left text-gray-500'>Please enter the OTP send to your email</span>
                  <input className={styles.textbox} type="password" placeholder='OTP' />
                </div>
                <button type='submit' className={styles.btn} >Recover</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Can't Get OTP? <button className='ml-2 text-red-500' to="/recover">Resend OTP</button></span>
            </div>

        </form>

      </div>
    </div>
  </div>
  )
}

export default Recovery
