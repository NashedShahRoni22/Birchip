import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, Save, Key, LoaderCircle } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const { authInfo, handleLogout } = useAuth();
  const router = useRouter();

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending } = usePostMutation({
    endPoint: "/reset-password",
    token: true,
  });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords don't match!");
    }

    const payload = {
      token: authInfo?.token,
      email: authInfo?.email,
      password: passwordData.newPassword,
      password_confirmation: passwordData.confirmPassword,
    };

    mutate(payload, {
      onSuccess: (data) => {
        toast.success(data?.message || "Password updated!");
      },

      onError: (error) => {
        console.error(error?.message);

        if (
          error?.message?.toLocaleLowerCase()?.includes("invalid") ||
          error?.message?.toLocaleLowerCase()?.includes("expired token.")
        ) {
          toast.error("Your session has expired. Please login again.");
          handleLogout(true);
          router.push("/auth");
          return;
        }

        toast.error(error?.message || "Password couldn't update!");
      },
    });
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
      <div className="border-line/20 rounded-2xl border bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
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
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 pr-12 text-gray-900 transition-all duration-300 outline-none focus:scale-[1.02] focus:border-[#B63D5E]"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 pr-12 text-gray-900 transition-all duration-300 outline-none focus:scale-[1.02] focus:border-[#B63D5E]"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
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
            disabled={isPending}
            className={`flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl py-4 font-semibold shadow-lg transition-all duration-300 ${
              isPending
                ? "cursor-not-allowed bg-gray-400 text-gray-200"
                : "from-primary to-button flex items-center justify-center gap-2.5 bg-gradient-to-r text-white"
            }`}
          >
            <Save size={20} />
            Update Password
            {isPending && (
              <LoaderCircle size={18} className="mt-0.5 animate-spin" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
