import './App.css';
import { BrowserRouter, Routes, Route ,   Switch} from 'react-router-dom';
import Home from "components/pages/Home";
import About from "components/pages/About";
import NotFound from "components/pages/NotFound";

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;