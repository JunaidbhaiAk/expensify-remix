import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Page() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/expenses/list", { replace: true }); // Use replace to avoid history push
  }, [navigate]);

  return null;
}
