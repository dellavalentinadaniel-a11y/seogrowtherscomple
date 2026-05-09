
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, User, Send, Reply, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const ArticleComments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [replyTo, setReplyTo] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (articleId) fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .select('id, article_id, parent_id, author_name, author_email, content, is_approved, created_at')
        .eq('article_id', articleId)
        .eq('is_approved', true) // Only show approved
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.content || !newComment.email) {
      toast({ title: "Error", description: "Todos los campos son obligatorios", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('article_comments')
        .insert([{
          article_id: articleId,
          parent_id: replyTo,
          author_name: newComment.name,
          author_email: newComment.email,
          content: newComment.content,
          is_approved: true // Auto-approve for demo
        }]);

      if (error) throw error;

      toast({ 
        title: "Comentario enviado", 
        description: "Gracias por participar.",
        className: "bg-green-600 border-none text-white"
      });
      
      setNewComment({ name: '', email: '', content: '' });
      setReplyTo(null);
      fetchComments(); // Refresh
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "No se pudo enviar el comentario.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`flex gap-4 mb-6 ${isReply ? 'ml-12 border-l-2 border-slate-800 pl-6' : ''}`}>
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-[#00d9ff] border border-slate-700">
          <User size={20} />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-bold text-sm">{comment.author_name}</span>
          <span className="text-gray-500 text-xs">• {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: es })}</span>
        </div>
        <div className="text-gray-300 text-sm mb-2">{comment.content}</div>
        <button 
          onClick={() => setReplyTo(comment.id)} 
          className="text-[#00d9ff] text-xs font-bold flex items-center gap-1 hover:underline"
        >
          <Reply size={12} /> Responder
        </button>
      </div>
    </div>
  );

  const rootComments = comments.filter(c => !c.parent_id);

  return (
    <section className="py-12 bg-[#0C0D0D]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <MessageSquare className="text-[#00d9ff]" /> Comentarios ({comments.length})
        </h3>

        {/* Comment Form */}
        <div className="bg-[#111827] p-6 rounded-xl border border-slate-800 mb-10">
          <h4 className="text-white font-bold mb-4">
            {replyTo ? 'Respondiendo comentario...' : 'Deja un comentario'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Nombre *" 
                value={newComment.name}
                onChange={e => setNewComment({...newComment, name: e.target.value})}
                className="bg-[#0a0e27] border-slate-700 text-white"
              />
              <Input 
                placeholder="Email (no será publicado) *" 
                type="email"
                value={newComment.email}
                onChange={e => setNewComment({...newComment, email: e.target.value})}
                className="bg-[#0a0e27] border-slate-700 text-white"
              />
            </div>
            <Textarea 
              placeholder="Escribe tu opinión aquí..."
              value={newComment.content}
              onChange={e => setNewComment({...newComment, content: e.target.value})}
              className="bg-[#0a0e27] border-slate-700 text-white min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              {replyTo && (
                <button type="button" onClick={() => setReplyTo(null)} className="text-red-400 text-sm hover:underline">
                  Cancelar respuesta
                </button>
              )}
              <Button type="submit" disabled={submitting} className="bg-[#00d9ff] text-black hover:bg-[#00c2e6] ml-auto font-bold">
                {submitting ? <Loader2 className="animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Publicar
              </Button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="space-y-6">
          {loading ? (
             <div className="text-center text-gray-500 py-8">Cargando comentarios...</div>
          ) : comments.length === 0 ? (
             <div className="text-center text-gray-500 py-8">Sé el primero en comentar.</div>
          ) : (
            rootComments.map(comment => (
              <div key={comment.id}>
                <CommentItem comment={comment} />
                {comments.filter(c => c.parent_id === comment.id).map(reply => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleComments;
