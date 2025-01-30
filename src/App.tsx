import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { Upload } from './pages/Upload';
import { DrugDetails } from './pages/DrugDetails';
import { Dashboard } from './pages/Dashboard';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/search" replace />} />
            <Route path="login" element={<Login />} />
            <Route
              path="search"
              element={
                <PrivateRoute>
                  <Search />
                </PrivateRoute>
              }
            />
            <Route
              path="upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route
              path="drug/:drugId"
              element={
                <PrivateRoute>
                  <DrugDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;