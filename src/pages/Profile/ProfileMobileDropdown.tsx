import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";
import { TABS, type TabId } from "./types";

interface ProfileMobileDropdownProps {
  activeTab:    TabId;
  isOpen:       boolean;
  onToggle:     () => void;
  onTabChange:  (tabId: TabId) => void;
  onSignOut:    () => void;
}

/**
 * Mobile-only tab selector — a button that reveals a dropdown menu.
 * Replaces the desktop sidebar on small screens.
 */
const ProfileMobileDropdown = ({
  activeTab,
  isOpen,
  onToggle,
  onTabChange,
  onSignOut,
}: ProfileMobileDropdownProps) => {
  const { colors, typography, radius, shadows, transitions } = useTheme();

  const activeTabData = TABS.find((t) => t.id === activeTab);

  const tabButtonBase: React.CSSProperties = {
    display:    "flex",
    alignItems: "center",
    gap:        8,
    padding:    "0.6rem 0.875rem",
    border:     "none",
    cursor:     "pointer",
    fontFamily: typography.fontBody,
    fontSize:   typography.sm,
    width:      "100%",
  };

  return (
    <div style={{ position: "relative" }}>

      {/* Trigger button — shows active tab label */}
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg, cursor: "pointer", fontFamily: typography.fontBody, fontSize: typography.base, color: colors.textPrimary }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {activeTabData?.icon}
          {activeTabData?.label}
        </span>
        <ChevronDown
          size={16}
          style={{
            color:      colors.textMuted,
            transform:  isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform ${transitions?.fast}`,
          }}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{   opacity: 0, y: -8  }}
            transition={{ duration: 0.18 }}
            style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 10, background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg, overflow: "hidden", boxShadow: shadows?.lg }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  style={{
                    ...tabButtonBase,
                    background: isActive ? colors.accentLight   : "transparent",
                    color:      isActive ? colors.accentPrimary : colors.textSecondary,
                    fontWeight: isActive ? typography.weightMedium : typography.weightRegular,
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              );
            })}

            {/* Sign out at the bottom of the dropdown */}
            <button
              onClick={onSignOut}
              style={{ ...tabButtonBase, color: colors.error, borderTop: `1px solid ${colors.borderLight}` }}
            >
              <LogOut size={15} /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMobileDropdown;
