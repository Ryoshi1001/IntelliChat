import { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const updateProfile = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 sm:p-8">
      <div className="glass-card w-4/5 max-w-2xl p-8 flex flex-row max-sm:flex-col-reverse max-sm:gap-3 items-center justify-center">
        <form
          onSubmit={updateProfile}
          className="flex w-full flex-col gap-4 flex-1"
        >
          <h2 className="font-bold text-lg">Profile Details</h2>

          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
              accept=".png, .jpg, jpeg"
              className="text-secondary"
              id="avatar"
              hidden
            />
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : assets.avatar_icon
              }
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
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
        </form>
        <div className="flex items-center self-stretch justify-end max-sm:justify-center">
          <img
            src={"/logo.png"}
            alt=""
            className="max-w-44 h-auto rounded-full sm:ml-8 aspect-square"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
