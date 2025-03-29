import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/api";
import toast from "react-hot-toast";
import ViewProfileShimmer from "../components/shimmer/ViewProfileShimmer";

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      setUser(response.data.data);
    } catch (error) {
      toast.error("Failed to load user profile");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ViewProfileShimmer />;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Users
        </button>

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500"
              />
              <span className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-slate-800 rounded-full"></span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-slate-400 mb-4">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-4 py-2 bg-slate-700/50 text-emerald-400 rounded-full text-sm">
                  {user.role || "Member"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{user.posts || 0}</p>
            <p className="text-slate-400">Posts</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {user.followers || 0}
            </p>
            <p className="text-slate-400">Followers</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {user.following || 0}
            </p>
            <p className="text-slate-400">Following</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{user.likes || 0}</p>
            <p className="text-slate-400">Likes</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">About</h2>
          <div className="space-y-4">
            <div>
              <p className="text-slate-400 mb-1">Location</p>
              <p className="text-white">{user.location || "Not specified"}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Joined</p>
              <p className="text-white">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Bio</p>
              <p className="text-white">{user.bio || "No bio available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
