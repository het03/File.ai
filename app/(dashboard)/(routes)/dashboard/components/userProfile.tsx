import { useUser } from "@clerk/clerk-react";

const UserProfilePicture = () => {
  const { user } = useUser();

  return (
    <div>
      {user?.imageUrl ? (
        <img
          src={user.imageUrl}
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      )}
    </div>
  );
};

export default UserProfilePicture;
