import { useState, useEffect } from "react";
import "tailwindcss";

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  subItems?: SubItem[];
  icon?: string;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "../App", icon: "fa-solid fa-chart-line" },
  { label: "Messages", href: "/messages", icon: "fa-solid fa-message" },
  {
    label: "Deals Log",
    subItems: [
      { label: "My Requests", href: "/deals/requests" },
      { label: "My Shares", href: "/deals/shares" },
    ],
    icon: "fa-solid fa-file-contract",
  },
  { label: "Your Bookmarks", href: "/bookmarks", icon: "fa-solid fa-bookmark" },
];

const Defbar = () => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className={`flex transition-all ${isOpen && !isMobile ? "ml-64" : ""}`}>
      {/* Tombol Sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-lg shadow-lg z-50"
      >
        <i className="fas fa-bars text-lg"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-white w-64 h-full shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        {/* Header */}
        <div className="p-4 text-center text-2xl font-bold border-b">Regrant</div>

        {/* Menu Items */}
        <ul className="p-4">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-5">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="flex items-center w-full text-left text-blue-500 hover:bg-gray-100 rounded-md px-2 py-2 text-sm"
                  >
                    <i className={`${item.icon} text-xs mr-2`}></i>
                    {item.label}
                    <i
                      className={`fas fa-chevron-down ml-auto text-xs ${openSubmenus[item.label] ? "rotate-180" : ""}`}
                    ></i>
                  </button>
                  {openSubmenus[item.label] && (
                    <ul className="ml-4 mt-1 text-xs">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-1">
                          <a href={subItem.href} className="block text-gray-700 hover:text-blue-500">
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a href={item.href} className="flex items-center text-gray-700 hover:text-blue-500 px-2 py-2 text-sm">
                  <i className={`${item.icon} text-xs mr-2`}></i>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Footer dengan Profil yang Dapat Diklik */}
        {user ? (
          <a href="/profile" className="absolute bottom-4 left-4 flex items-center hover:bg-gray-100 p-2 rounded-lg">
            <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </a>
        ) : (
          <div className="absolute bottom-4 left-4 text-sm text-gray-500">Not Logged In</div>
        )}
      </div>

      {/* Overlay untuk Desktop & Mobile */}
      {isOpen && <div className="fixed inset-0 bg-grey bg-opacity-5 z-30" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default Defbar;
