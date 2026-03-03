// AlreadyLog.tsx
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const AlreadyLog = () => {
  const [email, setEmail] = useState('');
  cons [error, setError] = useState('')

  async function handleError(e){
    return e.response?.data?.message || "Something went wrong"
  }

  const handleEmailNext = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:3003/api/auth/send-email-otp",
        { email: emailOrPhone },
        { withCredentials: true }
      )
      settempToken(res.data.tempToken)
      handleNext()
      setTimer(30)
    }
    catch (err) {
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  };

  const handleGoogleLogin = () => {
    console.log('→ Starting Google Sign-In...');
    // Your Google OAuth trigger here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 sm:px-6">
      <div className="w-full max-w-md flex flex-col items-center pt-8 pb-16">

        {/* Logo / Title area */}
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl font-black text-black tracking-tight">
            UBER
          </h1>
          <p className="text-center text-gray-500 text-sm mt-1.5 font-medium">
            already with us?
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-3">
          Welcome back
        </h2>

        <p className="text-center text-gray-600 text-lg sm:text-xl mb-8 max-w-xs">
          Log in to continue
        </p>

        {/* Email input + Next button form */}
        <form onSubmit={handleEmailNext} className="w-full max-w-sm mb-6">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`
              w-full px-5 py-5 text-lg border border-gray-300 rounded-full
              focus:outline-none focus:border-black focus:ring-0
              placeholder-gray-500
            `}
          />

          <button
            type="submit"
            className={`
              mt-4 w-full flex items-center justify-center gap-3
              bg-black text-white font-medium text-lg
              py-5 px-6 rounded-full
              hover:bg-gray-900 active:bg-gray-800
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-black/30
            `}
          >
            Next
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center w-full max-w-sm my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-4 text-gray-500 text-sm font-medium">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleLogin}
          className={`
            w-full max-w-sm flex items-center justify-center gap-4
            bg-white border border-gray-300
            hover:bg-gray-50 active:bg-gray-100
            text-black font-medium text-lg
            py-5 px-6 rounded-full
            shadow-sm transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-black/30
          `}
        >
          <FcGoogle className="text-3xl shrink-0" />
          Continue with Google
        </button>

        {/* Legal text */}
        <p className="text-center text-gray-500 text-xs mt-10 max-w-xs">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-black">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-black">
            Privacy Policy
          </a>.
        </p>

      </div>
    </div>
  );
};

export default AlreadyLog;