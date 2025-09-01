import { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChevronLeft } from "lucide-react";

const Profile = () => {
  const { authUser, updateProfile } = useContext(AuthContext)!;

  const [fullName, setFullName] = useState(authUser?.fullName);
  const [bio, setBio] = useState(authUser?.bio);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profilePic) {
      await updateProfile({ fullName, bio });
      navigate("/");
      return;
    }

    // if profilePic have to convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(profilePic);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ fullName, bio, profilePic: base64Image });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 sm:p-8">
      <div className="glass-card w-4/5 max-w-2xl p-8 flex flex-row max-sm:flex-col-reverse max-sm:gap-3 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 flex-1"
        >
          <h2 className="font-bold text-lg">Profile Details</h2>

          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              accept=".png, .jpg, jpeg"
              className="text-secondary"
              id="avatar"
              hidden
            />
            <img
              src={
                profilePic
                  ? URL.createObjectURL(profilePic)
                  : assets.avatar_icon
              }
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            upload profile image
          </label>

          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            value={fullName}
            placeholder="Your name"
            className="glass-input p-2 rounded-sm"
            required
          />
          <textarea
            rows={4}
            value={bio}
            className="glass-input rounded-sm p-2"
            required
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button type="submit" className="btn-primary">
            Save
          </button>
          {/* <button type="button"   onClick={() =>  navigate("/")} className="btn-primary">
            Cancel
          </button> */}
        </form>
        <div className="flex flex-col items-center self-stretch justify-start max-sm:justify-center">
          <div className="flex w-full justify-end">
            <ChevronLeft
              onClick={() => navigate("/")}
              className="w-8 h-8 text-muted hover:text-accent cursor-pointer transition-colors duration-200 hover:scale-110"
            />
          </div>

          <div className="flex-1 h-full flex items-center justify-center">
            <img
              src={authUser?.profilePic || "/logo.svg"}
              alt=""
              className={`max-w-44 h-auto rounded-full sm:ml-8 aspect-square ${
                authUser?.profilePic ? "bg-[#fff]" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
