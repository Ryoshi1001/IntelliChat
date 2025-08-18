interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  bio: string;
}

interface SidebarProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}