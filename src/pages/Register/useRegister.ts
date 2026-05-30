import { useEffect }    from "react";
import { useNavigate }  from "react-router-dom";
import { useAuth }      from "@clerk/clerk-react";

const useRegister = () => {
  const navigate       = useNavigate();
  const { isSignedIn } = useAuth();

  // Redirect away if already signed in
  useEffect(() => {
    if (isSignedIn) navigate("/", { replace: true });
  }, [isSignedIn, navigate]);
};

export default useRegister;