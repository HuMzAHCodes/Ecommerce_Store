import { ChevronRight, LogOut } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import UserAvatar from "./UserAvatar";
import { TABS, type TabId } from "./types";

interface ProfileSidebarProps {
  userName:      string;
  userEmail:     string;
  userImage?:    string;
  activeTab:     TabId;
  onTabChange:   (tabId: TabId) => void;
  onSignOut:     () => void;
}

/**
 * Sticky desktop sidebar — user avatar + info, tab nav buttons, sign out.
 * Hidden on mobile (replaced by ProfileMobileDropdown).
 */
const ProfileSidebar = ({
  userName,
  userEmail,
  userImage,
  activeTab,
  onTabChange,
  onSignOut,
}: ProfileSidebarProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();

  const tabButtonBase: React.CSSProperties = {
    display:      "flex",
    alignItems:   "center",
    gap:          8,
    padding:      "0.6rem 0.875rem",
    borderRadius: radius?.md,
    border:       "none",
    cursor:       "pointer",
    fontFamily:   typography.fontBody,
    fontSize:     typography.sm,
    transition:   `all ${transitions?.fast}`,
    width:        "100%",
    justifyContent: "space-between",
  };

  return (
    <div style={{ background: colors.bgCard, borderRadius: radius?.xl, padding: "1.5rem", border: `1px solid ${colors.borderLight}`, boxShadow: shadows?.sm, position: "sticky", top: 84 }}>

      {/* User info */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <UserAvatar name={userName} imageUrl={userImage} />
        <p style={{ fontFamily: typography.fontBody, fontSize: typography.sm, fontWeight: typography.weightMedium, color: colors.textPrimary, marginTop: "0.75rem", marginBottom: 2 }}>
          {userName}
        </p>
        <p style={{ fontFamily: typography.fontBody, fontSize: typography.xs, color: colors.textMuted }}>
          {userEmail}
        </p>
      </div>

      {/* Tab navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                ...tabButtonBase,
                background: isActive ? colors.accentLight    : "transparent",
                color:      isActive ? colors.accentPrimary  : colors.textSecondary,
                fontWeight: isActive ? typography.weightMedium : typography.weightRegular,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {tab.icon} {tab.label}
              </span>
              {isActive && <ChevronRight size={13} />}
            </button>
          );
        })}

        {/* Sign out */}
        <button
          onClick={onSignOut}
          style={{ ...tabButtonBase, color: colors.error, marginTop: "0.5rem", justifyContent: "flex-start" }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
