import { supabase } from './customSupabaseClient';

/**
 * DATABASE INTERFACE
 * Conecta los componentes del frontend con Supabase.
 * Reemplaza la antigua implementación de LocalStorage por persistencia en la nube.
 */
export const db = {
  auth: {
    /**
     * Inicia sesión con email y password
     */
    login: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { user: null, error: error.message };
      return { user: data.user, error: null };
    },

    /**
     * Cierra la sesión activa
     */
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message };
    },

    /**
     * Obtiene la sesión actual de forma asíncrona
     */
    getSession: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },

    /**
     * Registra un nuevo usuario
     */
    signUp: async (email, password) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { user: data.user, error: error?.message };
    }
  },

  articles: {
    /**
     * Lista todos los artículos publicados
     */
    list: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase fetch error:', error);
        return [];
      }
      return data;
    },

    /**
     * Obtiene un artículo por ID o Slug
     */
    get: async (idOrSlug) => {
      // Intenta detectar si es un UUID o un slug normal
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);
      const queryField = isUuid ? 'id' : 'slug';
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq(queryField, idOrSlug)
        .maybeSingle();

      if (error) {
        console.error(`Error fetching article [${idOrSlug}]:`, error);
        return null;
      }
      return data;
    },

    /**
     * Crea un nuevo artículo
     */
    create: async (articleData) => {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...articleData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      return { data, error: error?.message };
    },

    /**
     * Actualiza un artículo existente
     */
    update: async (id, articleData) => {
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...articleData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      return { data, error: error?.message };
    },

    /**
     * Elimina un artículo
     */
    delete: async (id) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      return { error: error?.message };
    }
  },

  storage: {
    /**
     * Sube una imagen a Supabase Storage (Bucket: 'images')
     */
    upload: async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) return { data: null, error: error.message };

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return { data: { publicUrl }, error: null };
    }
  }
};