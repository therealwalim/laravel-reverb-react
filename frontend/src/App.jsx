import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'src/context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import Home from './components/dashboard/Home';
import Login from './components/auth/Login';

function App() {

  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
