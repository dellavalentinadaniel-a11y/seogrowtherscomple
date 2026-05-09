
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const InteractionBar = ({ contentId, contentType, commentsCount = 0, onLikeChange }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    const tableName = contentType === 'news' ? 'news_likes' : 'article_likes';
    const idColumn = contentType === 'news' ? 'news_id' : 'article_id';

    const fetchLikes = useCallback(async () => {
        setLoading(true);
        try {
            // Get total likes count
            const { count, error } = await supabase
                .from(tableName)
                .select('id', { count: 'exact', head: true })
                .eq(idColumn, contentId);

            if (error) throw error;
            setLikes(count || 0);

            // Check if current user liked it
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error: likeError } = await supabase
                    .from(tableName)
                    .select('id')
                    .eq(idColumn, contentId)
                    .eq('user_id', user.id)
                    .maybeSingle();
                
                if (data) setIsLiked(true);
            }
        } catch (error) {
            console.error('Error fetching likes:', error);
        } finally {
            setLoading(false);
        }
    }, [contentId, idColumn, tableName]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        fetchLikes();
    }, [fetchLikes]);

    const handleLike = async () => {
        if (!session) {
            toast({
                title: "Inicia sesión",
                description: "Debes estar logueado para dejar un me gusta.",
                variant: "destructive"
            });
            return;
        }

        const user = session.user;
        const previousLiked = isLiked;
        const previousCount = likes;

        // Optimistic UI Update
        setIsLiked(!isLiked);
        const newLikes = isLiked ? likes - 1 : likes + 1;
        setLikes(newLikes);
        if (onLikeChange) onLikeChange(newLikes);

        try {
            if (previousLiked) {
                // Remove like
                const { error } = await supabase
                    .from(tableName)
                    .delete()
                    .eq(idColumn, contentId)
                    .eq('user_id', user.id);
                if (error) throw error;
            } else {
                // Add like
                const { error } = await supabase
                    .from(tableName)
                    .insert([{
                        [idColumn]: contentId,
                        user_id: user.id
                    }]);
                if (error) throw error;
            }
        } catch (error) {
            // Revert on error
            setIsLiked(previousLiked);
            setLikes(previousCount);
            toast({
                title: "Error",
                description: "No se pudo procesar tu interacción.",
                variant: "destructive"
            });
        }
    };

    const handleShare = async () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Enlace copiado",
            description: "¡Comparte este artículo con tus amigos!",
        });

        // Track share if logged in
        if (session?.user) {
            try {
                await supabase
                    .from('user_shares')
                    .insert([{
                        user_id: session.user.id,
                        content_id: contentId.toString(),
                        content_type: contentType
                    }]);
                
                // Trigger profile XP update (handled by table triggers if I added one, but I didn't add it in migration for user_shares yet)
                // Actually I should add a trigger for user_shares too or just do an RPC. 
                // Let's stick to the migration I ran which didn't have user_shares trigger. I'll add it now.
            } catch (error) {
                console.error('Error tracking share:', error);
            }
        }
    };

    return (
        <div className="flex items-center gap-6 py-4 border-y border-white/5 mb-8">
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-3 h-10 rounded-full transition-all ${isLiked ? 'text-pink-500 bg-pink-500/10 hover:bg-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-pulse" : ""} />
                    <span className="font-medium">{likes}</span>
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                        const commentsSection = document.getElementById('comments-section');
                        if (commentsSection) commentsSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5 px-3 h-10 rounded-full transition-all"
                >
                    <MessageSquare size={20} />
                    <span className="font-medium">{commentsCount}</span>
                </Button>
            </div>

            <div className="flex-1"></div>

            <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShare}
                className="text-gray-400 hover:text-white hover:bg-white/5 p-2 h-10 w-10 rounded-full transition-all"
            >
                <Share2 size={20} />
            </Button>
        </div>
    );
};

export default InteractionBar;
