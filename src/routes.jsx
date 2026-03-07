import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Spinner from './components/ui/Spinner';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const Scanner = lazy(() => import('./pages/Scanner'));
const Analysis = lazy(() => import('./pages/Analysis'));
const History = lazy(() => import('./pages/History'));

// 404 Page
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
    <div className="text-9xl font-black text-white/5 absolute -z-10 select-none">404</div>
    <h1 className="text-4xl font-black">QR Not Found</h1>
    <p className="text-text-secondary max-w-sm">
      The scan report you are looking for doesn't exist or has been deleted for security.
    </p>
    <a href="/" className="px-6 py-3 bg-primary text-black font-bold rounded-xl glow-primary transition-all hover:scale-105">
      Return Home
    </a>
  </div>
);

const AppRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scan" element={<Scanner />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default AppRoutes;
