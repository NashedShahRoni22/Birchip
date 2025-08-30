import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, Save, Key } from "lucide-react";

export default function ResetPassword() {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add password validation logic here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Password updated");
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    }, 2000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-line/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Key size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Change Password
            </h3>
            <p className="text-sm text-gray-600">
              Update your account password to keep it secure
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] focus:scale-[1.02] transition-all duration-300"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] focus:scale-[1.02] transition-all duration-300"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-button text-white hover:shadow-lg transform hover:scale-[1.02]"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Updating Password...
              </>
            ) : (
              <>
                <Save size={20} />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
