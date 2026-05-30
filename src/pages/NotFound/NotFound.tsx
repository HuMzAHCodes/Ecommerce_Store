import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import NotFoundIllustration from "./NotFound/NotFoundIllustration";
import NotFoundActions      from "./NotFound/NotFoundActions";

const NotFound = () => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        minHeight:       "80vh",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        background:      colors.bgPrimary,
        padding:         "3rem 1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", maxWidth: 480 }}
      >
        <NotFoundIllustration />
        <NotFoundActions />
      </motion.div>
    </div>
  );
};

export default NotFound;

