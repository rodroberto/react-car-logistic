// src/routes/AppRoutes.tsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import UnauthorizedRoute from './UnauthorizedRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Branches from '../pages/Branches/Branches';
import Users from '../pages/Users/Users';
import Reports from '../pages/Reports/Reports';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Unauthorized Routes */}
        <Route element={<UnauthorizedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          {/* Protected Routes */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/branches' element={<Branches />} />
          <Route path='/users' element={<Users />} />
          <Route path='/notifications' element={<Reports />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/chats' element={<Reports />} />
          <Route path='/settings' element={<Reports />} />
        </Route>

        {/* Redirect to home page if no matching route */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
