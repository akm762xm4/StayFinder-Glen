import { Link } from "react-router-dom";
import { getToken } from "../utils/localStorage";
import { images } from "../utils/images";

export function Home() {
  const token = getToken();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${
            images[Math.floor(Math.random() * images.length)]
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
      <div className="flex items-center justify-center relative z-10 bg-secondary/30 min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-5 items-center justify-center bg-primary/30 p-8 backdrop-blur-xs rounded-lg shadow-2xl shadow-black/50 z-20 md:px-[5%]">
          <h1 className="md:text-3xl text-xl font-bold">
            Welcome to StayFinder
          </h1>
          <p className="md:text-xl text-sm text-muted-foreground ">
            Find your perfect stay with ease
          </p>
          {!token && (
            <p className="md:text-base text-sm flex gap-2 items-center text-secondary/60">
              To book your stay please{" "}
              <Link
                to="/login"
                className="md:text-lg text-sm font-semibold  text-secondary "
              >
                Login
              </Link>
            </p>
          )}
          <div className="flex gap-4">
            <Link to="/properties">
              <button className="md:px-5 px-2 md:py-2 py-1 rounded bg-accent/80 hover:bg-accent/90 text-white md:text-lg text-sm font-medium">
                Browse Properties
              </button>
            </Link>
            {!token && (
              <Link to="/register">
                <button className="md:px-5 px-2 md:py-2 py-1 rounded border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 md:text-lg text-sm font-medium">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
