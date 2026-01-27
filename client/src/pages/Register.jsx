import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-100 font-paragraph px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body gap-5">
          
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold tracking-widest">
              REGISTER
            </h1>
            <p className="text-sm opacity-70 mt-1">
              Create your account
            </p>
          </div>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Full Name</legend>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              required
            />
            <p className='label'>Required</p>
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
            <p className='label'>Required</p>
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
            <p className='label'>Required</p>
          </fieldset>

          <button className="btn btn-primary w-full mt-2 tracking-wide">
            Create Account
          </button>

          <p className="text-center text-sm opacity-70">
            Already have an account?{" "}
            <Link to='/login'>
              <span className="link link-primary font-medium">
                Login
              </span>
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register
