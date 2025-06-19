import { useSignupMutation } from "../../api/serverApi";
import { UserI } from "@/api/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";
import { toast } from "sonner";

export function RegisterForm() {
  const { register, handleSubmit } = useForm<UserI>();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit: SubmitHandler<UserI> = async (data: UserI) => {
    try {
      await signup(data)
        .unwrap()
        .then((res) => {
          console.log(res);
          setToken(res.token);
          navigate("/");
          toast.success(`Welcome ${res.name}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full md:px-0 px-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium  ">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-1 "
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium  ">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-1 "
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium  ">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-1 "
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 rounded-lg bg-accent/80 hover:bg-accent/90 text-white text-sm font-medium"
      >
        Register
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-accent hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}
