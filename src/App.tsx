import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";
import Resources from "./pages/Resources";
import Processes from "./pages/Processes";
import Sites from "./pages/Sites";
import Backups from "./pages/Backups";
import Plans from "./pages/Plans";
import Incidents from "./pages/Incidents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
          <Route path="/processes" element={<Layout><Processes /></Layout>} />
          <Route path="/sites" element={<Layout><Sites /></Layout>} />
          <Route path="/backups" element={<Layout><Backups /></Layout>} />
          <Route path="/plans" element={<Layout><Plans /></Layout>} />
          <Route path="/incidents" element={<Layout><Incidents /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
