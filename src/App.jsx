import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Shimmer Components
import LoginShimmer from "./components/shimmer/LoginShimmer";
import SignupShimmer from "./components/shimmer/SignupShimmer";
import UserCardShimmer from "./components/shimmer/UserCardShimmer";
import ViewProfileShimmer from "./components/shimmer/ViewProfileShimmer";

// Lazy Components
const Login = React.lazy(() => import("./components/Login"));
const Signup = React.lazy(() => import("./components/Signup"));
const UsersList = React.lazy(() => import("./components/UsersList"));
const MainLayout = React.lazy(() => import("./components/Layout/MainLayout"));
import ViewProfile from "./pages/ViewProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1E293B",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoginShimmer />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/signup"
          element={
            <Suspense fallback={<SignupShimmer />}>
              <Signup />
            </Suspense>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <Suspense fallback={<LoginShimmer />}>
              <MainLayout />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="grid grid-cols-1  gap-6 p-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <UserCardShimmer key={i} />
                    ))}
                  </div>
                }
              >
                <UsersList />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<ViewProfileShimmer />}>
                <ViewProfile />
              </Suspense>
            }
          />
        </Route>

        {/* Redirect unknown routes to root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
