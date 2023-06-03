import { auth, googleProvider } from '../../firebase.config'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useRef } from 'react'
import Logo from '../components/Logo'
import { FcGoogle } from 'react-icons/fc'
import Spinner from '../components/Spinner'

const Auth = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // refs
  const emailRef = useRef(null)
  const pswRef = useRef(null)

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validateForm = ({ email, password }) => {
    const errors = {}
    const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/

    if (!password) {
      errors.password = 'password is required'
      pswRef.current.focus()
    }
    if (password.length < 6) {
      errors.password = 'password is too short'
      pswRef.current.focus()
    }
    if (!email) {
      errors.email = 'email is required'
      emailRef.current.focus()
    }
    if (!email.match(emailRegex)) {
      errors.email = 'email is invalid'
      emailRef.current.focus()
    }
    return errors
  }

  // toastify notification
  const notify = (text) =>
    toast(text, {
      theme: 'dark',
      draggable: true,
      position: toast.POSITION.BOTTOM_CENTER,
      role: 'alert',
      autoClose: 500,
    })
  // sign in with email and password
  const signIn = async () => {
    setIsLoading(true)
    try {
      const { email, password } = formValues
      await createUserWithEmailAndPassword(auth, email, password)
      notify('sign in successful')
    } catch (error) {
      notify('sign in failed')
      setIsLoading(false)
    }
  }
  // form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm(formValues)
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      signIn()
    }
  }
  console.log(auth?.currentUser?.email)
  // google auth
  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      notify('sign in successful')
    } catch (error) {
      notify('sign in failed')
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col justify-center align-center">
      <Logo className="text-center text-5xl mt-16 mb-5" />
      <div className="form w-11/12 max-w-[400px] rounded-md p-8 mx-auto mt-12 mb-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center font-semibold mb-4 text-2xl">Sign In</h2>
          <label htmlFor="email" className="block relative border-b">
            <input
              id="email"
              autoComplete="off"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className="w-full p-2 mt-5 text-sm placeholder:opacity-0"
              ref={emailRef}
            />
            <span className="absolute top-0 left-0 translate-y-6 duration-300">
              Email
            </span>
          </label>
          {formErrors.email && (
            <p className="text-[10px] text-purple">{formErrors.email}</p>
          )}
          <label htmlFor="password" className="block mt-3 relative border-b">
            <input
              id="password"
              type="password"
              onChange={handleChange}
              name="password"
              className="w-full p-2 mt-5 text-sm placeholder:opacity-0"
              placeholder="password"
              ref={pswRef}
            />
            <span className="absolute top-0 left-0 translate-y-6 duration-300">
              Password
            </span>
          </label>
          {formErrors.password && (
            <p className="text-[10px] text-purple">{formErrors.password}</p>
          )}

          <button
            className="w-full mt-4 py-3 bg-purple text-white text-xl font-semibold rounded-md hover:spacing"
            type="submit"
          >
            Sign In
          </button>
        </form>
        {/* sign in with google */}
        <button
          className="w-full mt-4 py-3 px-2 bg-transparent border-2 text-xl font-semibold rounded-md hover:spacing"
          onClick={signInWithGoogle}
        >
          <FcGoogle size={24} className="inline -mt-1 mr-2" />
          <span>Sign in with Google</span>
        </button>
      </div>
      {isLoading && <Spinner />}
      <ToastContainer limit={2} />
    </main>
  )
}

export default Auth
