import { useTheme } from "../../theme/ThemeContext";

interface UserAvatarProps {
  name:      string;
  imageUrl?: string;
}

/**
 * Shows the user's profile image if available.
 * Falls back to a styled circle with the first letter of their name.
 */
const UserAvatar = ({ name, imageUrl }: UserAvatarProps) => {
  const { colors, typography, radius } = useTheme();
  const initial = name.charAt(0).toUpperCase();

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        style={{ width: 68, height: 68, borderRadius: radius?.full, objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      style={{
        width:           68,
        height:          68,
        borderRadius:    radius?.full,
        background:      colors.accentLight,
        color:           colors.accentPrimary,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        fontFamily:      typography.fontDisplay,
        fontSize:        typography["3xl"],
      }}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;
