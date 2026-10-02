import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayPage from './pages/Display.page';
import EventsPage from './pages/EventsPage';
import NotFound from './components/NotFound';

const AdminRedirect = () => {
  window.location.href = '/admin/index.html';
  return null;
};

function App() {
  return (
    <Router>
      <div className="bg-surface min-h-screen">
        <Routes>
          <Route path="/" element={<DisplayPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/admin/*" element={<AdminRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
