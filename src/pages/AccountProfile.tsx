import { UserProfile } from "@clerk/clerk-react";

const AccountProfile = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <UserProfile />
    </div>
  );
};

export default AccountProfile;