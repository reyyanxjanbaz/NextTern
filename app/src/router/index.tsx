import { createBrowserRouter } from 'react-router-dom';
import { UserRole } from '@shared/types/user';
import { RoleGuard } from '@/components/auth/RoleGuard';
import Login from '@/pages/auth/Login';
import StudentDashboard from '@/pages/student/Dashboard';
import RecruiterDashboard from '@/pages/recruiter/Dashboard';
import Home from '@/pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // Student Routes
  {
    path: '/student',
    element: <RoleGuard allowedRoles={[UserRole.STUDENT]} />,
    children: [
      {
        path: 'dashboard',
        element: <StudentDashboard />,
      },
      // Add more student routes here
    ],
  },
  // Recruiter Routes
  {
    path: '/recruiter',
    element: <RoleGuard allowedRoles={[UserRole.RECRUITER]} />,
    children: [
      {
        path: 'dashboard',
        element: <RecruiterDashboard />,
      },
      // Add more recruiter routes here
    ],
  },
]);
