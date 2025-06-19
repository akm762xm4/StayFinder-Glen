import { useLoginMutation } from "../../api/serverApi";
import { UserI } from "../../api/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";
import { toast } from "sonner";

export function LoginForm() {
  const { register, handleSubmit } = useForm<UserI>();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserI> = async (data: UserI) => {
    try {
      await login(data)
        .unwrap()
        .then((res) => {
          setToken(res.token);
          navigate("/");
          window.location.reload();
          toast.success(`Welcome ${res.name}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full  md:px-0 px-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium leading-none ">
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
      <div className="flex flex-col gap-2">
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
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-accent hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}
