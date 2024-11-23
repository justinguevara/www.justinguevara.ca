import './App.css';
import { BrowserRouter, Routes, Route, Switch} from 'react-router-dom';
import HomePage from "components/pages/HomePage";
import AboutPage from "components/pages/AboutPage";
import NotFoundPage from "components/pages/NotFoundPage";

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;