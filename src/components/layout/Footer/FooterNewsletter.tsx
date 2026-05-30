import { motion }   from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../../theme/ThemeContext";
import {
  footerPalette,
  newsletterHeadingStyles, newsletterSubtextStyles,
  newsletterFormStyles,    newsletterInputStyles,
  newsletterButtonStyles,  newsletterSuccessStyles,
} from "./footerStyles";

interface FooterNewsletterProps {
  emailInput:       string;
  isSubscribed:     boolean;
  onEmailChange:    (value: string) => void;
  onSubscribe:      (e: React.FormEvent) => void;
}

const FooterNewsletter = ({
  emailInput, isSubscribed,
  onEmailChange, onSubscribe,
}: FooterNewsletterProps) => {
  const { colors, typography, radius } = useTheme();
  const { green, greenDark, butter, borderButter } = footerPalette(colors);

  return (
    <div>
      <h4 style={newsletterHeadingStyles(typography, butter)}>
        Stay in the loop
      </h4>

      <p style={newsletterSubtextStyles(typography, footerPalette(colors).butterMuted)}>
        New drops, restocks, and offers — straight to your inbox.
      </p>

      {isSubscribed ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={newsletterSuccessStyles(typography, butter)}
        >
          ✓ You're subscribed!
        </motion.p>
      ) : (
        <form onSubmit={onSubscribe} style={newsletterFormStyles}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={emailInput}
            onChange={(e) => onEmailChange(e.target.value)}
            style={newsletterInputStyles(typography, butter, greenDark, borderButter, radius)}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={newsletterButtonStyles(typography, butter, green, radius)}
          >
            Subscribe <ArrowRight size={15} />
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default FooterNewsletter;