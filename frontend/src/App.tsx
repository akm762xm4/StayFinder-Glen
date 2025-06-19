import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { Properties } from "./pages/Properties";
import { Bookings } from "./pages/Bookings";
import { Home } from "./pages/Home";
import { PropertyDetails } from "./components/properties/PropertyDetails";

function Login() {
  return (
    <div className="max-w-md mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
      <h1 className="md:text-3xl text-xl font-bold ">Login</h1>
      <LoginForm />
    </div>
  );
}

function Register() {
  return (
    <div className="max-w-md mx-auto min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
      <h1 className="md:text-3xl text-xl font-bold ">Register</h1>
      <RegisterForm />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
