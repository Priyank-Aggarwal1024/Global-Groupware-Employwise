import { useState, useCallback, useEffect } from "react";
import { getUsers, updateUser, deleteUser } from "../services/api";
import toast from "react-hot-toast";

export const useUsers = (onError) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [total, setTotal] = useState(12);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setPerPage(response.data.per_page);
      setTotal(response.data.total);
    } catch (error) {
      toast.error("Failed to fetch users");
      onError(error);
    } finally {
      setLoading(false);
    }
  }, [page, onError]);

  const handleUpdate = async (id, userData) => {
    try {
      const response = await updateUser(id, userData);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, ...response.data } : user
        )
      );
      toast.success("User updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update user");
      onError(error);
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
      return true;
    } catch (error) {
      toast.error("Failed to delete user");
      onError(error);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, fetchUsers]);

  return {
    users,
    loading,
    page,
    totalPages,
    setPage,
    fetchUsers,
    handleUpdate,
    handleDelete,
    perPage,
    total,
  };
};
