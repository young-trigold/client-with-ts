import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MessageList } from '../components/Message/Message';
import HomePage from '../pages/HomePage/HomePage';
import LoadingPage from '../components/LoadingIndicator';
import NotFoundPage from '../components/NotFoundPage';

const NotePage = React.lazy(() => import('../pages/NotePage/NotePage'));
const ReadingPage = React.lazy(() => import('../pages/ReadingPage/ReadingPage'));
const ChapterListPage = React.lazy(() => import('../pages/ChapterListPage/ChapterListPage'));
const ProtectPage = React.lazy(() => import('../pages/AdminPage/ProtectPage'));

function RouterPart() {
  return (
    <>
      <MessageList />
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="notes"
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotePage />
              </Suspense>
            }
          />
          <Route
            path="notes/:noteTitle"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ChapterListPage />
              </Suspense>
            }
          />
          <Route
            path="reading/articles/:itemId"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ReadingPage isChapter={false} />
              </Suspense>
            }
          />
          <Route />
          <Route
            path="reading/chapters/:itemId"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ReadingPage isChapter />
              </Suspense>
            }
          />
          <Route
            path="admin"
            element={
              <Suspense fallback={<LoadingPage text="正在验证身份" />}>
                <ProtectPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default RouterPart;
