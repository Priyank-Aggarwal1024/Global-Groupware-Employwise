import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditUserModal = ({ user, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        role: user.role || "Member",
      });
      setErrors({});
    }
  }, [user]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const newErrors = { ...errors };
    switch (name) {
      case "first_name":
        if (!value.trim()) {
          newErrors[name] = "First name is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "last_name":
        if (!value.trim()) {
          newErrors[name] = "Last name is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors[name] = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors[name] = "Please enter a valid email address";
        } else {
          delete newErrors[name];
        }
        break;
      case "role":
        if (!value) {
          newErrors[name] = "Role is required";
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all form errors before submitting");
      return;
    }

    try {
      setLoading(true);
      await onUpdate(user.id, formData);
      toast.success("User updated successfully");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-slate-800 rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Edit User</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white ${
                errors.first_name ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="Enter first name"
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white ${
                errors.last_name ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="Enter last name"
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white ${
                errors.email ? "border-red-500" : "border-slate-600"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white ${
                errors.role ? "border-red-500" : "border-slate-600"
              }`}
            >
              <option value="">Select a role</option>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
