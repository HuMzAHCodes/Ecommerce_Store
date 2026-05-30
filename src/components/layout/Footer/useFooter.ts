import { useState } from "react";

interface FooterState {
  emailInput:       string;
  isSubscribed:     boolean;
  handleEmailChange:(value: string) => void;
  handleSubscribe:  (e: React.FormEvent) => void;
}

const useFooter = (): FooterState => {
  const [emailInput,   setEmailInput]   = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = (value: string) => setEmailInput(value);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const hasValidEmail = emailInput.trim().length > 0;
    if (!hasValidEmail) return;
    setIsSubscribed(true);
    setEmailInput("");
    // TODO: wire up to Mailchimp / Klaviyo API
  };

  return { emailInput, isSubscribed, handleEmailChange, handleSubscribe };
};

export default useFooter;