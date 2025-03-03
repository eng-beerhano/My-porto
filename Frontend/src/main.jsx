import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Dashboard from './pages/dashboard.jsx';
import AddSkill from './pages/AddSkill.jsx';
import Allskills from './pages/Allskills.jsx';
import AddProject from './pages/AddProject.jsx';
import AllProjects from './pages/AllProjects.jsx';
import AddExperience from './pages/AddExperience.jsx';
import AllExperiences from './pages/AllExperiences.jsx';
import Skill from '../../Backend/Models/Skills.js';
import SkillsPage from './pages/SkillsPage.jsx';
import ExpPage from './pages/ExpPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import Massage from './pages/Massage.jsx';
import ContectUsPage from './pages/ContectUsPage.jsx';
// import AddProject from './pages/AddProject.jsx';
// import AddExperience from './pages/AddExperience.jsx';
// import AllSkills from './pages/AllSkills.jsx';
// import AllProjects from './pages/AllProjects.jsx';
// import AllExperiences from './pages/AllExperiences.jsx';
// import Inbox from './pages/Inbox.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path:'/skills',
        element:<SkillsPage/>
      },
      {
      path:'expPage',
      element:<ExpPage/>
      },
      {
     path:'projects',
     element:<ProjectsPage/>
      },
      {
     path:'contact',
     element:<ContectUsPage/>
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'addskill',
            element: <AddSkill />,
          },
          {
            path: 'all-skills',
            element: <Allskills />,
          },
          {
            path: 'add-project',
            element: <AddProject />,
          },
          {
            path: 'all-projects',
            element: <AllProjects />,
          },
          {
            path: 'add-experience',
            element: <AddExperience />,
          },
          
          
          {
            path: 'all-experiences',
            element: <AllExperiences />,
          },
          {
            path: 'inbox',
            element: <Massage />,
          },
        ],
      },
    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

export default router;