import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import CookieBanner from '@/components/layout/CookieBanner';
import PageLoader from '@/components/shared/PageLoader';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

// Lazy Loaded Pages
const Home = lazy(() => import('@/pages/Home'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const Project = lazy(() => import('@/pages/Project'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const Services = lazy(() => import('@/pages/Services'));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));
const SeoGuidePage = lazy(() => import('@/pages/SeoGuidePage'));
const AiStudioGuidePage = lazy(() => import('@/pages/AiStudioGuidePage'));
const SsdGuidePage = lazy(() => import('@/pages/SsdGuidePage'));
const ToolsPage = lazy(() => import('@/pages/ToolsPage'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const CreatePostPage = lazy(() => import('@/pages/blog/CreatePostPage'));
const ForumPage = lazy(() => import('@/pages/ForumPage'));

// Auth Pages (Lazy Loaded)
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ProfilePage = lazy(() => import('@/pages/auth/ProfilePage'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const SuccessCaseAluvalle = lazy(() => import('@/pages/SuccessCaseAluvalle'));

// Admin Imports (Lazy Loaded)
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
// const Login = lazy(() => import('@/pages/admin/Login'));
const ArticlesList = lazy(() => import('@/pages/admin/ArticlesList'));
const ArticleForm = lazy(() => import('@/pages/admin/ArticleForm'));
const ToolsList = lazy(() => import('@/pages/admin/ToolsList'));
const ToolForm = lazy(() => import('@/pages/admin/ToolForm'));
const ResourcesList = lazy(() => import('@/pages/admin/ResourcesList'));
const ResourceForm = lazy(() => import('@/pages/admin/ResourceForm'));
const CategoriesList = lazy(() => import('@/pages/admin/CategoriesList'));
const CategoryForm = lazy(() => import('@/pages/admin/CategoryForm'));
const AdsManagement = lazy(() => import('@/pages/admin/AdsManagement'));
const SeoAudit = lazy(() => import('@/pages/admin/SeoAudit'));
const ArticlesPreview = lazy(() => import('@/pages/admin/ArticlesPreview'));

// Placeholders (Lazy Loaded)
const Placeholders = lazy(() => import('@/pages/Placeholders'));

// Temporary components to handle named exports from lazy loaded modules
const SuccessCasesPage = lazy(() => import('@/pages/Placeholders').then(module => ({ default: module.SuccessCasesPage })));
const SuccessCaseDetailPage = lazy(() => import('@/pages/Placeholders').then(module => ({ default: module.SuccessCaseDetailPage })));
const TestimonialsPage = lazy(() => import('@/pages/Placeholders').then(module => ({ default: module.TestimonialsPage })));
const ServiceDetailPage = lazy(() => import('@/pages/Placeholders').then(module => ({ default: module.ServiceDetailPage })));
const ResourceDetailPage = lazy(() => import('@/pages/Placeholders').then(module => ({ default: module.ResourceDetailPage })));
const ToolDetailPage = lazy(() => import('@/pages/Placeholders').then(module => ({ default: module.ToolDetailPage })));

function App() {
  const location = useLocation();
  return (
    <HelmetProvider>
      <Analytics />
      <ScrollToTop />
      <CookieBanner />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* Blog Cluster */}
              <Route path="blog" element={<BlogPage />} />
              <Route path="forum" element={<ForumPage />} />
              <Route path="blog/create" element={<CreatePostPage />} />
              <Route path="blog/edit/:id" element={<CreatePostPage />} />
              <Route path="blog/:category" element={<BlogPage />} />
              <Route path="blog/:category/:slug" element={<ArticleDetail />} />



              {/* Services Cluster */}
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetailPage />} />
              <Route path="services/success-cases" element={<SuccessCasesPage />} />
              <Route path="services/success-cases/:slug" element={<SuccessCaseDetailPage />} />
              <Route path="services/testimonials" element={<TestimonialsPage />} />

              {/* Resources Cluster */}
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="recursos" element={<ResourcesPage />} />
              <Route path="resources/google-seo-fundamentals" element={<SeoGuidePage />} />
              <Route path="resources/google-ai-studio-2026" element={<AiStudioGuidePage />} />
              <Route path="resources/ssd-ps5-optimization-2026" element={<SsdGuidePage />} />
              <Route path="resources/:slug" element={<ResourceDetailPage />} />

              {/* Tools Cluster */}
              <Route path="tools" element={<ToolsPage />} />
              <Route path="tools/:slug" element={<ToolDetailPage />} />

              {/* Core Pages */}
              <Route path="contact" element={<ContactPage />} />
              <Route path="project/:projectId" element={<Project />} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="terms-of-service" element={<Terms />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="auth/forgot-password" element={<ForgotPassword />} />
              <Route path="auth/reset-password" element={<ResetPassword />} />
              <Route path="services/success-cases/aluvalle-transformacion-digital" element={<SuccessCaseAluvalle />} />
            </Route>



            {/* Admin Routes */}

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ArticlesList />} />
              <Route path="dashboard" element={<ArticlesList />} />

              {/* Articles */}
              <Route path="articles" element={<ArticlesList />} />
              <Route path="articles/new" element={<ArticleForm />} />
              <Route path="articles/:id/edit" element={<ArticleForm />} />



              {/* Tools */}
              <Route path="tools" element={<ToolsList />} />
              <Route path="tools/new" element={<ToolForm />} />
              <Route path="tools/:id/edit" element={<ToolForm />} />

              {/* Resources */}
              <Route path="resources" element={<ResourcesList />} />
              <Route path="resources/new" element={<ResourceForm />} />
              <Route path="resources/:id/edit" element={<ResourceForm />} />

              {/* Categories */}
              <Route path="categories" element={<CategoriesList />} />
              <Route path="categories/new" element={<CategoryForm />} />
              <Route path="categories/:id/edit" element={<CategoryForm />} />

              {/* System */}
              <Route path="ads" element={<AdsManagement />} />
              <Route path="seo-audit" element={<SeoAudit />} />
            </Route>

            <Route path="/admin/articles/:id/preview" element={<ArticlesPreview />} />

          </Routes>
        </Suspense>
      </AnimatePresence>
    </HelmetProvider>
  );
}

export default App;
