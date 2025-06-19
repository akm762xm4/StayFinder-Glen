import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/localStorage";
import { toast } from "sonner";

interface LogoutFormProps {
  setIsOpen: (open: boolean) => void;
}

export function LogoutForm({ setIsOpen }: LogoutFormProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setIsOpen(false);
    navigate("/");
    window.location.reload();
    toast.success("Logged out successfully.");
  };

  return (
    <div className="flex flex-col gap-4 ">
      <p className="md:text-base text-sm text-muted-foreground">
        Are you sure you want to log out?
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer text-gray-800 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-accent  cursor-pointer text-white text-sm font-medium"
        >
          Yes
        </button>
      </div>
    </div>
  );
}
