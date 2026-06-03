import { useState }     from "react";
import { useTheme }     from "../theme/ThemeContext";
import { useAuth }      from "../components/auth/AuthContext";   // Firebase auth
import { useToast }     from "../components/ui/Toast";
import { motion }       from "framer-motion";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth }         from "../components/auth/firebase";

const AccountProfile = () => {
  const { colors, typography, radius } = useTheme();
  const { user } = useAuth();
  const toast    = useToast();

  const [displayName,  setDisplayName]  = useState(user?.displayName ?? "");
  const [newPassword,  setNewPassword]  = useState("");
  const [currentPw,    setCurrentPw]    = useState("");
  const [savingName,   setSavingName]   = useState(false);
  const [savingPw,     setSavingPw]     = useState(false);

  const handleUpdateName = async () => {
    if (!user) return;
    setSavingName(true);
    try {
      await updateProfile(user, { displayName });
      toast.success("Name updated successfully.");
    } catch {
      toast.error("Failed to update name.");
    } finally {
      setSavingName(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user || !user.email) return;
    setSavingPw(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPw);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success("Password updated successfully.");
      setCurrentPw("");
      setNewPassword("");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/wrong-password") {
        toast.error("Current password is incorrect.");
      } else if (code === "auth/weak-password") {
        toast.error("New password must be at least 6 characters.");
      } else {
        toast.error("Failed to update password.");
      }
    } finally {
      setSavingPw(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    padding:      "0.65rem 0.875rem",
    fontFamily:   typography.fontBody,
    fontSize:     typography.sm,
    color:        colors.textPrimary,
    background:   colors.bgPrimary,
    border:       `1px solid ${colors.borderLight}`,
    borderRadius: radius?.md ?? "8px",
    outline:      "none",
  };

  const btnStyle: React.CSSProperties = {
    padding:      "0.6rem 1.25rem",
    background:   colors.accentPrimary,
    color:        colors.textOnAccent ?? "#fff",
    border:       "none",
    borderRadius: radius?.md ?? "8px",
    fontFamily:   typography.fontBody,
    fontSize:     typography.sm,
    fontWeight:   typography.weightMedium,
    cursor:       "pointer",
  };

  const labelStyle: React.CSSProperties = {
    display:      "block",
    marginBottom: "0.35rem",
    fontSize:     typography.sm,
    fontFamily:   typography.fontBody,
    color:        colors.textSecondary,
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bgPrimary, display: "flex", justifyContent: "center", padding: "2rem 1.25rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {/* Update name */}
        <div style={{ background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg ?? "12px", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontSize: "1.1rem", marginBottom: "1rem" }}>
            Display Name
          </h2>
          <label style={labelStyle}>Name</label>
          <input value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle} placeholder="Your name" />
          <button onClick={handleUpdateName} disabled={savingName} style={{ ...btnStyle, marginTop: "1rem", opacity: savingName ? 0.7 : 1 }}>
            {savingName ? "Saving…" : "Save Name"}
          </button>
        </div>

        {/* Email (read-only) */}
        <div style={{ background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg ?? "12px", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontSize: "1.1rem", marginBottom: "1rem" }}>
            Email Address
          </h2>
          <label style={labelStyle}>Email</label>
          <input value={user?.email ?? ""} readOnly style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} />
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: colors.textMuted, fontFamily: typography.fontBody }}>
            Email cannot be changed here.
          </p>
        </div>

        {/* Change password — only show for email/password users, not Google */}
        {user?.providerData?.[0]?.providerId === "password" && (
          <div style={{ background: colors.bgCard, border: `1px solid ${colors.borderLight}`, borderRadius: radius?.lg ?? "12px", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: typography.fontDisplay, color: colors.textPrimary, fontSize: "1.1rem", marginBottom: "1rem" }}>
              Change Password
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label style={labelStyle}>Current password</label>
                <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} style={inputStyle} placeholder="••••••••" />
              </div>
              <div>
                <label style={labelStyle}>New password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} placeholder="Min. 6 characters" />
              </div>
            </div>
            <button onClick={handleUpdatePassword} disabled={savingPw} style={{ ...btnStyle, marginTop: "1rem", opacity: savingPw ? 0.7 : 1 }}>
              {savingPw ? "Updating…" : "Update Password"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AccountProfile;
