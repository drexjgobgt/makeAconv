import { useState, useRef, useEffect } from "react";
import {
  LogOutIcon,
  VolumeOffIcon,
  Volume2Icon,
  CameraIcon,
  XIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const clickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const fileInputRef = useRef(null);

  // ✅ Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile picture updated");
      } catch (err) {
        toast.error("Failed to update profile picture");
      }
    };
    reader.readAsDataURL(file);
  };

  // ✅ Handle sound toggle
  const handleSoundToggle = () => {
    try {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    } catch {}
    toggleSound();
  };

  // ✅ Open modal
  const handleLogout = () => setIsModalOpen(true);

  // ✅ Close modal with fade-out
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 250);
  };

  // ✅ Confirm logout
  const confirmLogout = async () => {
    await logout();
    closeModal();
  };

  // ✅ ESC key closes modal
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="p-4 sm:p-6 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-md rounded-t-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* LEFT: Avatar + Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="relative rounded-full overflow-hidden group focus:outline-none focus:ring-2 focus:ring-cyan-500"
              title="Change profile picture"
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName || "User Avatar"}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <CameraIcon className="w-5 h-5 text-white" />
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <div>
              <h3 className="text-slate-200 font-semibold text-sm sm:text-base truncate max-w-[140px] sm:max-w-[180px]">
                {authUser?.fullName || "User"}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">Online</p>
            </div>
          </div>

          {/* RIGHT: Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Sound toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full p-1"
              title="Toggle sound"
            >
              {isSoundEnabled ? (
                <Volume2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <VolumeOffIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
              title="Logout"
            >
              <LogOutIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* LOGOUT MODAL */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm transition-all duration-300 ${
            isClosing
              ? "animate-fadeOut bg-black/0"
              : "animate-fadeIn bg-black/60"
          }`}
        >
          <div
            className={`bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative transition-all duration-300 transform ${
              isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 transition"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Content */}
            <h2 className="text-lg sm:text-xl font-semibold text-center text-slate-100 mb-2">
              Logout Confirmation
            </h2>
            <p className="text-slate-400 text-center mb-6 text-sm sm:text-base">
              Are you sure you want to log out from your account?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-3 sm:gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors text-sm sm:text-base w-28"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm sm:text-base w-28"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileHeader;
