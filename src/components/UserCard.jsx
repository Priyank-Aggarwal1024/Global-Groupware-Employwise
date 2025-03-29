import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EditUserModal from "./EditUserModal";

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [showActions, setShowActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  const handleEdit = () => {
    setShowEditModal(true);
    setShowActions(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete(user.id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
    setShowActions(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700/50">
        <div className="flex flex-col sm:hidden space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-800 rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white truncate">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-slate-400 truncate">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-slate-800/50 rounded-lg">
              <p className="text-lg font-bold text-white">{user.posts || 0}</p>
              <p className="text-xs text-slate-400">Posts</p>
            </div>
            <div className="text-center p-2 bg-slate-800/50 rounded-lg">
              <p className="text-lg font-bold text-white">
                {user.followers || 0}
              </p>
              <p className="text-xs text-slate-400">Followers</p>
            </div>
            <div className="text-center p-2 bg-slate-800/50 rounded-lg">
              <p className="text-lg font-bold text-white">
                {user.following || 0}
              </p>
              <p className="text-xs text-slate-400">Following</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleViewProfile}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              View Profile
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>

              {showActions && (
                <div className="absolute  right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-1 z-10 border border-slate-700">
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-12 12a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828l12-12z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-800 rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-slate-400 text-sm truncate">{user.email}</p>
              <span className="inline-block px-3 py-1 bg-slate-700/50 text-emerald-400 text-xs font-medium rounded-full mt-1">
                {user.role || "Member"}
              </span>
            </div>
          </div>

          <div className="flex space-x-4 items-center">
            <div className="text-center px-3">
              <p className="text-xl font-bold text-white">{user.posts || 0}</p>
              <p className="text-xs text-slate-400">Posts</p>
            </div>
            <div className="text-center px-3 border-x border-slate-700">
              <p className="text-xl font-bold text-white">
                {user.followers || 0}
              </p>
              <p className="text-xs text-slate-400">Followers</p>
            </div>
            <div className="text-center px-3">
              <p className="text-xl font-bold text-white">
                {user.following || 0}
              </p>
              <p className="text-xs text-slate-400">Following</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              View Profile
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  console.log("clicked");
                  setShowActions(!showActions);
                }}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-1 z-10 border border-slate-700">
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-white hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-12 12a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828l12-12z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditUserModal
        user={user}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default UserCard;
