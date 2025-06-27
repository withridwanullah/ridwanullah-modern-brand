import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Tools from "./pages/Tools";
import Tutorials from "./pages/Tutorials";
import Courses from "./pages/Courses";
import Podcasts from "./pages/Podcasts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Consultations from './pages/Consultations';
import Toolkits from './pages/Toolkits';
import LeadMagnets from './pages/LeadMagnets';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/podcasts" element={<Podcasts />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/toolkits" element={<Toolkits />} />
                <Route path="/lead-magnets" element={<LeadMagnets />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
