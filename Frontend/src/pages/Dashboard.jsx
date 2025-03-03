import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FilePlus, FolderPlus, Briefcase, List, Mail, LogOut } from "lucide-react"; // Import icons
import pic from "../assets/pic.jpeg";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <nav className="w-1/4 bg-white p-4 shadow-md flex flex-col justify-between min-h-screen">
          <div>
            <img src={pic} alt="Logo" className="h-14 w-11 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Eng berdev</h1>
            <ul className="space-y-4">
              <li>
                <Link to="addskill" className="flex items-center text-black">
                  <FilePlus className="w-5 h-5 mr-2" /> Add Skill
                </Link>
              </li>
              <li>
                <Link to="all-skills" className="flex items-center text-black">
                  <List className="w-5 h-5 mr-2" /> All Skills
                </Link>
              </li>
              <li>
                <Link to="add-project" className="flex items-center text-black">
                  <FolderPlus className="w-5 h-5 mr-2" /> Add Project
                </Link>
              </li>
              <li>
                <Link to="all-projects" className="flex items-center text-black">
                  <List className="w-5 h-5 mr-2" /> All Projects
                </Link>
              </li>
              <li>
                <Link to="add-experience" className="text-black flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" /> Add Experience
                </Link>
              </li>
              <li>
                <Link to="all-experiences" className="flex items-center text-black">
                  <List className="w-5 h-5 mr-2" /> All Experiences
                </Link>
              </li>
              <li>
                <Link to="inbox" className="flex items-center text-black">
                  <Mail className="w-5 h-5 mr-2" /> Inbox
                </Link>
              </li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-white bg-red-500 p-2 rounded hover:bg-red-600"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </nav>
        <main className="w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;