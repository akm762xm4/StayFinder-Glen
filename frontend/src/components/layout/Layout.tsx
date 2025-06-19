import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/localStorage";
import { Modal } from "./Modal";
import { LogoutForm } from "../../pages/LogoutForm";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const token = getToken();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  return (
    <div className="min-h-screen bg-primary">
      <header className="sticky top-0 z-50 w-full border-b border-highlight/70 bg-primary">
        <div className="flex p-4">
          <div className="flex items-center  gap-6">
            <Link to="/">
              <span className="md:text-3xl text-xl font-bold">StayFinder</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 text-sm md:text-base font-medium">
              <Link
                to="/properties"
                className="transition-colors hover:text-accent/80"
              >
                Properties
              </Link>
              {token && (
                <Link
                  to="/bookings"
                  className="transition-colors hover:text-accent/80"
                >
                  My Bookings
                </Link>
              )}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Desktop Auth Buttons */}
            {token && (
              <button
                className="hidden md:block px-4 py-2 rounded-lg bg-transparent hover:bg-gray-100 text-sm font-medium border border-gray-300"
                onClick={() => setIsLogoutOpen(true)}
              >
                Logout
              </button>
            )}
            {!token && (
              <nav className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <button className="px-4 py-2 rounded-lg bg-transparent hover:bg-gray-100 text-sm font-medium border border-gray-300">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-lg bg-accent/80 hover:bg-accent/90  text-white text-sm font-medium">
                    Register
                  </button>
                </Link>
              </nav>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-highlight/70">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                to="/properties"
                className="transition-colors hover:text-foreground/80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Properties
              </Link>
              {token && (
                <Link
                  to="/bookings"
                  className="transition-colors hover:text-foreground/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              {token && (
                <button
                  className="w-full px-4 py-2 rounded-lg bg-transparent hover:bg-gray-100 text-sm font-medium border border-gray-300"
                  onClick={() => setIsLogoutOpen(true)}
                >
                  Logout
                </button>
              )}
              {!token && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-highlight/70">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 rounded-lg bg-transparent hover:bg-gray-100 text-sm font-medium border border-gray-300">
                      Login
                    </button>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-2 rounded-lg bg-accent/80 hover:bg-accent/90 text-white text-sm font-medium">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      {isLogoutOpen && (
        <Modal
          title="Logout"
          setIsOpen={setIsLogoutOpen}
          child={<LogoutForm setIsOpen={setIsLogoutOpen} />}
        />
      )}
    </div>
  );
}
