
const  SignUp = () => {
  return (
    // Exact background color from your screenshot (#f9fafb)
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-4 font-sans">
      
      {/* Main container with NO extra white background */}
      <div className="flex w-full max-w-[880px]">
        
        {/* Left Form Section (white card) */}
        <div className="w-full md:w-[440px] p-8 bg-white rounded-l-lg">
          <div className="text-center mb-7">
            <h1 className="text-[22px] font-bold text-gray-900 mb-[6px]">Create Account</h1>
            <p className="text-gray-600 text-[14px]">Get started with your free account</p>
          </div>

          <form className="space-y-4">
            <div className="form-control">
              <label className="label p-0 mb-1">
                <span className="label-text text-xs font-medium">Full Name</span>
              </label>
              <input
                type="text"
                defaultValue="John Doa"
                className="input input-bordered w-full h-[38px] px-3 text-sm rounded-[5px]"
              />
            </div>

            <div className="form-control">
              <label className="label p-0 mb-1">
                <span className="label-text text-xs font-medium">Email</span>
              </label>
              <input
                type="email"
                defaultValue="you@example.com"
                className="input input-bordered w-full h-[38px] px-3 text-sm rounded-[5px]"
              />
            </div>

            <div className="form-control">
              <label className="label p-0 mb-1">
                <span className="label-text text-xs font-medium">Password</span>
              </label>
              <input
                type="password"
                defaultValue="password"
                className="input input-bordered w-full h-[38px] px-3 text-sm rounded-[5px]"
              />
            </div>

            <button className="btn btn-primary w-full h-[38px] min-h-[38px] text-sm mt-1">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-[14px] mb-3 leading-[1.4]">
              Join our community<br />
              Connect with friends, share moments, and stay in touch with<br />
              your loved ones.
            </p>
            <p className="text-gray-500 text-[13px]">
              Already have an account?{' '}
              <a href="#" className="text-blue-600 font-medium">Sign In</a>
            </p>
          </div>
        </div>

        {/* Right Side - EXACT 3x3 Grid */}
        <div className="hidden md:flex flex-1 bg-[#f9fafb] items-center justify-center">
          <div className="grid grid-cols-3 gap-4 w-[80%] h-[80%] opacity-20">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-300 rounded-sm"
                style={{ aspectRatio: '1/1' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default  SignUp;