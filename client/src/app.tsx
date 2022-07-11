import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useRootDispatch, useRootSelector } from 'store/hooks';
import { selectAuthLoading, selectAuthLoggedIn, selectAuthToken } from 'store/selectors';
import { createAuthenticateActionThunk } from 'store/action-creators';

import AdminCreateNewItemPage from 'pages/admin/admin-create-new-item-page';
import CategoriesPage from 'pages/admin/admin-categories-page';
import HomePage from './pages/home-page';

import LoginPage from './pages/login-page';
import AdminPage from './pages/admin/admin-page';
import AdminChangeItemPage from './pages/admin/admin-change-item-page';
import PageLayout from './components/page-layout';
import RequireAuth from './routing/require-auth';
import RequireVisitor from './routing/require-visitor';

const App: React.FC = () => {
  const location = useLocation();
  const token = useRootSelector(selectAuthToken);
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  if (!loggedIn && token) {
    if (!loading) {
      dispatch(createAuthenticateActionThunk(token, location.pathname));
    }
    return <div />;
  }

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<RequireVisitor><LoginPage /></RequireVisitor>} />
        <Route path="/admin" element={<RequireAuth><AdminPage /></RequireAuth>} />
        <Route path="/admin/change-item/:id" element={<RequireAuth><AdminChangeItemPage /></RequireAuth>} />
        <Route path="/admin/create-new-item" element={<RequireAuth><AdminCreateNewItemPage /></RequireAuth>} />
        <Route path="/admin/categories" element={<RequireAuth><CategoriesPage /></RequireAuth>} />
      </Route>
    </Routes>
  );
};

export default App;
