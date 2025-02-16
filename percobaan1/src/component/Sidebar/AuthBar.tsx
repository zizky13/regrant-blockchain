import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss";

interface MenuItem {
  label: string;
  href: string;
}

interface User {
  email: string;
  password: string;
}

const menuItems: MenuItem[] = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

const AuthBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, [setIsAuthenticated]);
  

  const handleMenuClick = (item: MenuItem) => {
    setModalType(item.label.toLowerCase());
    setShowModal(true);
    setIsOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email dan password harus diisi.");
      return;
    }
  
    try {
      const response = await fetch("/users.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users: User[] = await response.json();
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        console.log("Login berhasil:", user);
        closeModal();
        localStorage.setItem("isAuthenticated", "true"); // Simpan status login
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError("Email atau password salah.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Terjadi kesalahan.");
    }
  };
  
  return (
    <div className={`flex transition-all ${isOpen && !isMobile ? "ml-64" : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-lg shadow-lg z-50"
      >
        <i className="fas fa-bars text-lg"></i>
      </button>

      <div
        className={`fixed top-0 left-0 bg-white w-64 h-full shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <div className="p-4 text-center text-2xl font-bold border-b">Regrant</div>
        <ul className="p-4">
          {menuItems.map((item, index) => (
    
            <li key={index} className="mb-5">
              <button
                onClick={() => handleMenuClick(item)}
                className="flex items-center text-gray-700 hover:text-blue-500 px-2 py-2 text-sm w-full text-left"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-grey bg-opacity-5 z-30" onClick={() => setIsOpen(false)}></div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{modalType === "login" ? "Login" : "Sign Up"}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2">
                Batal
              </button>
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                {modalType === "login" ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthBar;
