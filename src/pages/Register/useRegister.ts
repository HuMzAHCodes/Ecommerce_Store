// import { useEffect }    from "react";
// import { useNavigate }  from "react-router-dom";
// import { useAuth }      from "@clerk/clerk-react";

// const useRegister = () => {
//   const navigate       = useNavigate();
//   const { isSignedIn } = useAuth();

//   // Redirect away if already signed in
//   useEffect(() => {
//     if (isSignedIn) navigate("/", { replace: true });
//   }, [isSignedIn, navigate]);
// };

// export default useRegister;



import { useEffect, useState }  from "react";
import { useNavigate }           from "react-router-dom";
import { useAuth }               from "../../components/auth/AuthContext"; // adjust path

interface UseRegisterOptions {
  email:     string;
  password:  string;
  setErrors: (errs: { general?: string }) => void;
}

interface UseRegisterReturn {
  handleSubmit: () => void;
  handleGoogle: () => void;
  isLoading:    boolean;
}

const useRegister = ({ email, password, setErrors }: UseRegisterOptions): UseRegisterReturn => {
  const navigate                          = useNavigate();
  const { register, loginGoogle, isSignedIn } = useAuth();
  const [isLoading, setIsLoading]         = useState(false);

  // Redirect away if already signed in
  useEffect(() => {
    if (isSignedIn) navigate("/", { replace: true });
  }, [isSignedIn, navigate]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      await register(email, password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      let message = "Registration failed. Please try again.";
      if (code === "auth/email-already-in-use") {
        message = "An account with this email already exists. Try signing in instead.";
      } else if (code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (code === "auth/weak-password") {
        message = "Password is too weak. Use at least 6 characters.";
      }
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setErrors({});
    try {
      await loginGoogle();
      navigate("/", { replace: true });
    } catch {
      setErrors({ general: "Google sign-in failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, handleGoogle, isLoading };
};

export default useRegister;
