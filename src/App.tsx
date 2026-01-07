import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { AgentCapabilities } from './components/sections/AgentCapabilities';
import { CoreFeatures } from './components/sections/CoreFeatures';
import { OrchestrationFlow } from './components/sections/OrchestrationFlow';
import { DataIntegration } from './components/sections/DataIntegration';
import { UseCases } from './components/sections/UseCases';
import { Comparison } from './components/sections/Comparison';
import { Waitlist } from './components/sections/Waitlist';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';

const LandingPage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <AgentCapabilities />
      <CoreFeatures />
      <OrchestrationFlow />
      <DataIntegration />
      <UseCases />
      <Comparison />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <Waitlist />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
