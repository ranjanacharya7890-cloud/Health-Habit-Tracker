import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import HabitsList from "./pages/HabitsList";
import Today from "./pages/Today";
import HabitForm from "./pages/HabitForm";

function App() {
  return (
    // HabitProvider wraps everything so context is available on every page
    <HabitProvider>
      <BrowserRouter>
        {/* Navbar sits outside Routes so it renders on every page */}
        <Navbar />

        {/* Mapping each URL path to the correct page component */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<HabitsList />} />
          <Route path="/today" element={<Today />} />
          <Route path="/add" element={<HabitForm />} />
          {/* :id is a URL parameter - HabitForm reads it to know which habit to edit */}
          <Route path="/edit/:id" element={<HabitForm />} />
        </Routes>
      </BrowserRouter>
    </HabitProvider>
  );
}

export default App;
