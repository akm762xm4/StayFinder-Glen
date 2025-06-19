import { useNavigate } from "react-router-dom";

interface RequiredLoginProps {
  setIsOpen: (open: boolean) => void;
}

export function RequiredLogin({ setIsOpen }: RequiredLoginProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base text-muted-foreground ">
        You have to login before booking.
      </p>
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-lg bg-accent/80 hover:bg-accent/90 text-white text-sm font-medium"
        >
          Login
        </button>
      </div>
    </div>
  );
}
