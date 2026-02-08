import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Loader } from '@/components/ui/loader';

const HRTasksHub = lazy(() => import('@/pages/HRTasksHub').then(m => ({ default: m.HRTasksHub })));
const CalendarPage = lazy(() => import('@/pages/Calendar').then(m => ({ default: m.CalendarPage })));
const SearchPage = lazy(() => import('@/pages/Search').then(m => ({ default: m.SearchPage })));
const KlaAI = lazy(() => import('@/pages/KlaAI').then(m => ({ default: m.KlaAI })));
const Inbox = lazy(() => import('@/pages/Inbox').then(m => ({ default: m.Inbox })));
const Settings = lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));
const WindahComp = lazy(() => import('@/pages/WindahComp').then(m => ({ default: m.WindahComp })));
const NoSpaceDev = lazy(() => import('@/pages/NoSpaceDev').then(m => ({ default: m.NoSpaceDev })));
const DribbblePortfolio = lazy(() => import('@/pages/DribbblePortfolio').then(m => ({ default: m.DribbblePortfolio })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/hr-tasks-hub" replace />} />
            <Route path="hr-tasks-hub" element={<HRTasksHub />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="kla-ai" element={<KlaAI />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="settings" element={<Settings />} />
            <Route path="windah-comp" element={<WindahComp />} />
            <Route path="nospace-dev" element={<NoSpaceDev />} />
            <Route path="dribbble-portfolio" element={<DribbblePortfolio />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
