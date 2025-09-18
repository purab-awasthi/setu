import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Helper function to get a cookie
const getCookie = (name: string) => {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
};

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // --- Start of Prototype Logic ---
    // In a real application, this would be an API call to your backend
    if (isLogin) {
      console.log("Login Data:", data);
      setCookie("user_name", "Student", 7); // Set a placeholder name for the session
      setCookie("new_user", "false", 7); // Simulate an existing user
      alert("Logged in successfully! Redirecting to home.");
      navigate("/");
    } else {
      console.log("Signup Data:", data);
      setCookie("user_name", "New User", 7); // Set a placeholder name for the session
      setCookie("new_user", "true", 7); // Simulate a new user
      alert("Signed up successfully! Please complete your profile.");
      navigate("/profile-form");
    }
    // --- End of Prototype Logic ---
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
        {/* Image Section - Hidden on small screens for better mobile experience */}
        <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/setulogodark.png')" }}>
          <div className="p-10 flex flex-col justify-end h-full">
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isLogin ? "Login to your account" : "Create a new account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <button
                type="button" // Use type="button" to prevent form submission
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary hover:text-accent transition-colors"
              >
                {isLogin ? "create a new account" : "login to an existing account"}
              </button>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              {isLogin && (
                <div className="text-sm">
                  <Link to="#" className="font-medium text-primary hover:text-accent">
                    Forgot your password?
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/90 transition-colors"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
