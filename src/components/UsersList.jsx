import React, { Suspense, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import UserCardShimmer from "./shimmer/UserCardShimmer";
import UserCard from "./UserCard";
import { useUsers } from "../hooks/useUsers";

const UsersList = () => {
  const {
    users,
    loading,
    page,
    totalPages,
    perPage,
    total,
    setPage,
    handleUpdate,
    handleDelete,
    fetchUsers,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(query) ||
      user.last_name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((index) => (
            <UserCardShimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] lg:p-8 md:p-4 p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="text-emerald-500">👥</span>
          Users
          <span className="ml-auto text-sm bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">
            Dashboard
          </span>
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-xl backdrop-blur-sm">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="text-slate-300 text-sm font-medium bg-slate-800/50 px-4 py-2 rounded-lg whitespace-nowrap">
              <span className="text-emerald-500">
                {(page - 1) * perPage + 1}
              </span>
              <span className="mx-1">-</span>
              <span className="text-emerald-500">
                {Math.min(page * perPage, total)}
              </span>
              <span className="mx-1">of</span>
              <span className="text-emerald-500">{total}</span>
              <span className="ml-1">users</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto justify-center">
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
                title="First Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
                title="Previous Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-1 overflow-x-auto">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const showPage =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= page - 1 && pageNumber <= page + 1);

                  if (showPage) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`
                          w-9 h-9 rounded-lg font-medium text-sm transition-all duration-200 shrink-0
                          ${
                            page === pageNumber
                              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                          }
                        `}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    (pageNumber === page - 2 || pageNumber === page + 2) &&
                    window.innerWidth > 640
                  ) {
                    return (
                      <span
                        key={pageNumber}
                        className="w-9 h-9 flex items-center justify-center text-slate-500 shrink-0"
                      >
                        •••
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
                title="Next Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L11.586 10l-4.293 4.293a1 1 0 000 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
                title="Last Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 bg-white/10 rounded-full" />
                  <div className="flex-1 space-y-3 w-full">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  No users found matching your search.
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 sm:p-4 p-0">
                {filteredUsers.map((user) => (
                  <Suspense key={user.id} fallback={<UserCardShimmer />}>
                    <UserCard
                      user={user}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  </Suspense>
                ))}
              </div>
            )}
          </>
        )}

        {users.length === 0 && !loading && (
          <div className="text-center text-slate-400 py-8">
            <p>No users found</p>
          </div>
        )}

        {selectedUser && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onUpdate={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
              toast.success("User updated successfully");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsersList;
