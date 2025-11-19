import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBlogPosts from "./pages/admin/BlogPosts";
import AdminBlogPostForm from "./pages/admin/BlogPostForm";
import AdminProjects from "./pages/admin/Projects";
import AdminProjectForm from "./pages/admin/ProjectForm";
import AdminServices from "./pages/admin/Services";
import AdminServiceForm from "./pages/admin/ServiceForm";
import AdminContactMessages from "./pages/admin/ContactMessages";
import AdminEquipment from "./pages/admin/Equipment";
import AdminEquipmentForm from "./pages/admin/EquipmentForm";
import AdminImageGallery from "./pages/admin/ImageGallery";
import AdminVacancies from "./pages/admin/Vacancies";
import AdminVacancyForm from "./pages/admin/VacancyForm";
import AdminCVs from "./pages/admin/CVs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog-posts" element={<AdminBlogPosts />} />
          <Route path="/admin/blog-posts/new" element={<AdminBlogPostForm />} />
          <Route path="/admin/blog-posts/:id" element={<AdminBlogPostForm />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminProjectForm />} />
          <Route path="/admin/projects/:id" element={<AdminProjectForm />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/services/new" element={<AdminServiceForm />} />
          <Route path="/admin/services/:id" element={<AdminServiceForm />} />
          <Route path="/admin/equipment" element={<AdminEquipment />} />
          <Route path="/admin/equipment/new" element={<AdminEquipmentForm />} />
          <Route path="/admin/equipment/:id" element={<AdminEquipmentForm />} />
          <Route path="/admin/messages" element={<AdminContactMessages />} />
          <Route path="/admin/images" element={<AdminImageGallery />} />
          <Route path="/admin/vacancies" element={<AdminVacancies />} />
          <Route path="/admin/vacancies/new" element={<AdminVacancyForm />} />
          <Route path="/admin/vacancies/:id" element={<AdminVacancyForm />} />
          <Route path="/admin/cvs" element={<AdminCVs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
