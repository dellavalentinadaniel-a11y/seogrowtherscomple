import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageCircle, Send, User, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const BlogCommentsSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile) setUserRole(profile.role);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .select(`
          id, content, created_at, user_id, article_id, is_approved,
          profiles:user_id(username, full_name, avatar_url)
        `)
        .eq('article_id', articleId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching blog comments:', error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
    checkUser();
  }, [fetchComments, checkUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .insert([
          {
            article_id: articleId,
            user_id: user.id,
            content: newComment.trim(),
            is_approved: true
          }
        ])
        .select(`
          id, content, created_at, user_id, article_id, is_approved,
          profiles:user_id(username, full_name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setComments([data, ...comments]);
      setNewComment('');
      toast({ title: "Comentario enviado", description: "Tu respuesta ha sido publicada." });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({ 
        title: "Error al comentar", 
        description: error.message || "No se pudo enviar el comentario. Inténtalo de nuevo.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const { error } = await supabase
        .from('article_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      setComments(comments.filter(c => c.id !== commentId));
      toast({ title: "Comentario eliminado" });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo eliminar el comentario.", variant: "destructive" });
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="text-cyan-400" />
        <h3 className="text-2xl font-bold text-white">Respuestas ({comments.length})</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-12 relative">
          <div className="relative group">
            <textarea
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-h-[120px] text-white placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none resize-none font-sans"
              placeholder="Únete a la conversación..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="absolute bottom-4 right-4">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-[#0C0D0D] rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? "Enviando..." : (
                  <>
                    <Send size={16} />
                    Responder
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 mb-12 text-center">
          <p className="text-gray-400 mb-4">Inicia sesión para participar en la comunidad.</p>
          <a href="/login" className="inline-block px-8 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all font-medium">
            Iniciar Sesión
          </a>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 text-center py-8">Cargando respuestas...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8 italic">No hay respuestas todavía. ¡Sé el primero!</p>
        ) : (
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-cyan-500/20 bg-cyan-500/5 overflow-hidden">
                      {comment.profiles?.avatar_url ? (
                        <img src={comment.profiles.avatar_url} alt={comment.profiles.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cyan-500/40">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {comment.profiles?.full_name || comment.profiles?.username || 'Miembro de la Comunidad'}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                  </div>
                  
                  {(user?.id === comment.user_id || userRole === 'admin' || userRole === 'moderator') && (
                    <button 
                      onClick={() => handleDelete(comment.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-2"
                      title="Eliminar Comentario"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default BlogCommentsSection;
