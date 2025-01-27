import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "components/pages/HomePage";
import AboutPage from "components/pages/AboutPage";
import NotFoundPage from "components/pages/NotFoundPage";
import MusicPage from "components/pages/MusicPage";
import QuestionMarkPage from "components/pages/questionmarkpage/QuestionMarkPage";
import ToolsPage from "components/pages/toolspage/ToolsPage";

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/q" element={<QuestionMarkPage />} />
        <Route path="/tools" element={<ToolsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;