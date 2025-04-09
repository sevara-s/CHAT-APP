import { useState } from "react";
import AuthImagePattern from "../../components/auth-image-pattern";
import {
  Mail,
  MessageSquare,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  User,
} from "lucide-react";
import type { FormDataType } from "../../@types";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    fullName: "",
  });
  const { signup, isRegisterLoading } = useAuthStore();
  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(formData);
    console.log(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
        </div>

        <form onSubmit={LoginSubmit} className="w-[70%] mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={isRegisterLoading}
            type="submit"
            className="btn btn-primary w-full mt-5"
          >
            {isRegisterLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Sign up</span>
            )}
          </button>
        </form>
        <div className="text-center mt-5">
          <p className="text-base-content/60">
          Already have an account{" "}
            <Link to="/sign-in" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back"
        subtitle="Sign in to continue your conversation and catch up with your messages"
      />
    </div>
  );
};

export default SignUp;
