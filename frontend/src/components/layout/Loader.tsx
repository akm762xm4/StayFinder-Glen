import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-gray-500">
      <Loader2 className="h-16 w-16 mb-4 animate-spin" />
    </div>
  );
}
