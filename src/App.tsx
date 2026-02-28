import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import ScanningAttackers from "./pages/ScanningAttackers";
import ScanningMidfielders from "./pages/ScanningMidfielders";
import ScanningDefenders from "./pages/ScanningDefenders";
import TechniqueAttackers from "./pages/TechniqueAttackers";
import TechniqueMidfielders from "./pages/TechniqueMidfielders";
import TechniqueDefenders from "./pages/TechniqueDefenders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/scanning-attackers" element={<ScanningAttackers />} />
          <Route path="/scanning-midfielders" element={<ScanningMidfielders />} />
          <Route path="/scanning-defenders" element={<ScanningDefenders />} />
          <Route path="/technique-attackers" element={<TechniqueAttackers />} />
          <Route path="/technique-midfielders" element={<TechniqueMidfielders />} />
          <Route path="/technique-defenders" element={<TechniqueDefenders />} />
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
