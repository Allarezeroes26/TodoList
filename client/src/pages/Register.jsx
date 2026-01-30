import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userAuth } from '../stores/authStore'
import { Eye, EyeClosed } from 'lucide-react'

const Register = () => {

  const { isRegistering, authUser, register } = userAuth()

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const passShow = () => {
    if (!showPassword) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    await register({ name, email, password })
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-base-100 font-paragraph px-4">
      <form className='w-full flex justify-center' onSubmit={handleRegister}>
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
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                placeholder="John"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className='label'>Required</p>
            </fieldset>
            <fieldset className="fieldset w-full relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={passShow}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
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
      </form>
    </div>
  )
}

export default Register
