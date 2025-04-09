import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Navbar from "./components/navbar";
import Profile from "./pages/profile";
import { useThemeStore } from "./store/useThemStore";
import Settings from "./pages/settings";

function App() {
  const { checkUser, authUser, isCheckingUserLoader } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (isCheckingUserLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-primary size-16" />
      </div>
    );
  }

  return (
    <main data-theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/sign-in" replace />}
        />

        <Route
          path="/sign-in"
          element={!authUser ? <SignIn /> : <Navigate to="/" replace />}
        />

        <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to="/" replace />}
        />

        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/sign-in" replace />}
        />

        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="/sign-in" replace />}
        />
      </Routes>
    </main>
  );
}

export default App;
