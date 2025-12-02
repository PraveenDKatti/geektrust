import React from 'react'

export default function Signin({ setCurrentUser }) {

  function handleSubmit() {

  }

  function createAccount(){

  }

  return (
    <div className='flex justify-center'>
      <div className='p-8 shadow h-fit m-10 md:px-12 rounded-md w-full md:w-1/3'>
        <div className='mb-4 text-center'>
            <p className='text-2xl font-medium text-center mb-2'>Sign In</p>
            <p className='text-gray-500 text-sm'>Don't have an account? <span onClick={createAccount} className='text-blue-500'>sign up</span></p>
          </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-500 text-sm font-medium mb-1'>Email</label>
            <input type="text" placeholder='email' className='w-full p-2 bg-gray-100 rounded-md' />
          </div>
          <div>
            <label className='block text-gray-500 text-sm font-medium  mb-1'>Password</label>
            <input type="password" placeholder='password' className='w-full p-2 bg-gray-100 rounded-md' />
          </div>
          <button type='submit' className='block w-full bg-blue-500 text-white p-2 rounded'>Sign in</button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-400">or continue with</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/*sign in with SSO*/}
         <div className="space-y-3">
          <button
            onClick={() => handleSSO("google")}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
