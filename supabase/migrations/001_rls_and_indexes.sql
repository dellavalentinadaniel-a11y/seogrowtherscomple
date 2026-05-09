-- ============================================================
-- SEO Growthers — RLS Policies + Performance Indexes
-- Ejecutar en Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- =====================
-- 1. ENABLE RLS
-- =====================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;

-- =====================
-- 2. RLS POLICIES — PUBLIC READ (anon + authenticated)
-- =====================

-- Articles: solo publicados visibles al público
CREATE POLICY "articles_public_read" ON articles
  FOR SELECT USING (status = 'published');

-- Articles: autores autenticados pueden CRUD sus propios artículos
CREATE POLICY "articles_author_all" ON articles
  FOR ALL USING (auth.uid()::text = author);

-- Blog categories: lectura pública
CREATE POLICY "categories_public_read" ON blog_categories
  FOR SELECT USING (true);

-- Article comments: lectura pública de aprobados
CREATE POLICY "comments_public_read" ON article_comments
  FOR SELECT USING (is_approved = true);

-- Article comments: cualquiera puede insertar (moderación posterior)
CREATE POLICY "comments_public_insert" ON article_comments
  FOR INSERT WITH CHECK (true);

-- Article likes: lectura pública
CREATE POLICY "likes_public_read" ON article_likes
  FOR SELECT USING (true);

-- Article likes: usuarios autenticados pueden dar like
CREATE POLICY "likes_auth_insert" ON article_likes
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Article likes: usuarios pueden borrar su propio like
CREATE POLICY "likes_auth_delete" ON article_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Contact submissions: solo INSERT público, nunca lectura
CREATE POLICY "contact_insert_only" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Contact submissions: solo admins pueden leer
CREATE POLICY "contact_admin_read" ON contact_submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Profiles: lectura pública (avatar, nombre)
CREATE POLICY "profiles_public_read" ON profiles
  FOR SELECT USING (true);

-- Profiles: usuarios pueden actualizar su propio perfil
CREATE POLICY "profiles_self_update" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Team members: lectura pública
CREATE POLICY "team_public_read" ON team_members
  FOR SELECT USING (true);

-- Ad settings: lectura pública (para renderizar ads)
CREATE POLICY "ads_public_read" ON ad_settings
  FOR SELECT USING (true);

-- Resources: lectura pública
CREATE POLICY "resources_public_read" ON resources
  FOR SELECT USING (true);

-- Blog news: lectura pública
CREATE POLICY "news_public_read" ON blog_news
  FOR SELECT USING (true);

-- Integrations: lectura pública
CREATE POLICY "integrations_public_read" ON integrations
  FOR SELECT USING (true);

-- Webinars: lectura pública
CREATE POLICY "webinars_public_read" ON webinars
  FOR SELECT USING (true);

-- =====================
-- 3. PERFORMANCE INDEXES
-- =====================

-- Articles: query principal del blog (status + order by created_at)
CREATE INDEX IF NOT EXISTS idx_articles_status_created
  ON articles (status, created_at DESC);

-- Articles: búsqueda por slug (article detail page)
CREATE INDEX IF NOT EXISTS idx_articles_slug
  ON articles (slug);

-- Articles: partial index solo publicados (más eficiente)
CREATE INDEX IF NOT EXISTS idx_articles_published
  ON articles (created_at DESC) WHERE status = 'published';

-- Blog categories: filtro por type + slug
CREATE INDEX IF NOT EXISTS idx_blog_categories_type_slug
  ON blog_categories (type, slug);

-- Article comments: búsqueda por artículo + aprobación
CREATE INDEX IF NOT EXISTS idx_comments_article_approved
  ON article_comments (article_id, is_approved);

-- Article likes: conteo por artículo
CREATE INDEX IF NOT EXISTS idx_likes_article
  ON article_likes (article_id);

-- Article likes: verificar si usuario ya dio like
CREATE INDEX IF NOT EXISTS idx_likes_user_article
  ON article_likes (user_id, article_id);

-- Contact submissions: orden cronológico para admin
CREATE INDEX IF NOT EXISTS idx_contact_created
  ON contact_submissions (created_at DESC);

-- Profiles: búsqueda por role (admin check)
CREATE INDEX IF NOT EXISTS idx_profiles_role
  ON profiles (role);

-- Trigram extension para búsqueda de texto (ILIKE con wildcard)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Articles: índice trigram para búsqueda por título
CREATE INDEX IF NOT EXISTS idx_articles_title_trgm
  ON articles USING gin (title gin_trgm_ops);

-- =====================
-- 4. FULL-TEXT SEARCH (opcional, mejor que ILIKE)
-- =====================

-- Columna FTS generada automáticamente
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(summary, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_articles_fts
  ON articles USING gin (fts);

-- ============================================================
-- NOTAS:
-- - Ejecutar este script completo en Supabase SQL Editor
-- - Si alguna tabla no existe, esa línea dará error y las demás continuarán
-- - Las policies de admin asumen que profiles.role = 'admin' existe
-- - Para verificar RLS: SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
-- ============================================================
