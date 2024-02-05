import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EventForm from './pages/Home/EventForm';
import EventList from './pages/EventList/EventList';
import EventDetails from './pages/EventDetails/EventDetails';
import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/edit/:eventId" element={<EventForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
