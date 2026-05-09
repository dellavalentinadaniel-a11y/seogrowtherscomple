
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { 
  PenSquare, Image as ImageIcon, Tag, Send, ArrowLeft, 
  Eye, Layout, Loader2, Sparkles, AlertCircle, CheckCircle2,
  Facebook, Twitter, Linkedin, MessageCircle, Instagram, Copy, ExternalLink, Share2
} from 'lucide-react';
import SEOHead from '@/components/shared/SEOHead';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import NovelEditor from '@/components/shared/NovelEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreatePostPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditMode = !!id;
    const forumMode = location.state?.from === '/forum';
    const initialCategory = location.state?.category || '';
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [categories, setCategories] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState('');
    const [publishedTitle, setPublishedTitle] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: initialCategory,
        featured_image: '',
        meta_title: '',
        meta_description: '',
        social_x: '',
        social_linkedin: '',
        social_facebook: '',
        social_whatsapp: '',
        social_instagram: '',
        keywords: ''
    });

    const [calculatedSlug, setCalculatedSlug] = useState('');

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' + Math.random().toString(36).substring(2, 7);
    };

    useEffect(() => {
        if (formData.title) {
            setCalculatedSlug(generateSlug(formData.title));
        }
    }, [formData.title]);

    const previewPostUrl = `${window.location.origin}/blog/${formData.category || 'Comunidad'}/${calculatedSlug}`;

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast({
                    title: "Acceso restringido",
                    description: "Debes iniciar sesión para crear una publicación.",
                    variant: "destructive"
                });
                navigate('/login');
            } else {
                setUser(user);
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                if (profile) setUserRole(profile.role);
            }
        };

        const fetchCategories = async () => {
            const { data } = await supabase
                .from('blog_categories')
                .select('*')
                .eq('type', 'article');
            setCategories(data || []);
            if (data && data.length > 0 && !initialCategory) {
                setFormData(prev => ({ ...prev, category: data[0].name }));
            }
        };
        const fetchExistingPost = async () => {
            if (!id) return;
            try {
                const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
                if (error) throw error;
                if (data) {
                    setFormData({
                        title: data.title || '',
                        content: data.content_html || data.content || '',
                        excerpt: data.summary || '',
                        category: data.category || '',
                        featured_image: data.featured_image || '',
                        meta_title: data.meta_title || '',
                        meta_description: data.meta_description || '',
                        social_x: data.social_meta?.x || '',
                        social_linkedin: data.social_meta?.linkedin || '',
                        social_facebook: data.social_meta?.facebook || '',
                        social_whatsapp: data.social_meta?.whatsapp || '',
                        social_instagram: data.social_meta?.instagram || '',
                        keywords: data.keywords ? data.keywords.join(', ') : ''
                    });
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                toast({ title: 'Error', description: 'No se pudo cargar la publicación', variant: 'destructive' });
            }
        };

        checkUser();
        fetchCategories();
        fetchExistingPost();
    }, [navigate, id, initialCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (html) => {
        setFormData(prev => ({ ...prev, content: html }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            toast({
                title: "Campos incompletos",
                description: "Por favor completa el título y el contenido.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        // Only generate slug if it's new. For existing, we can keep the old one or generate a new one. Let's keep existing unchanged or update it minimally.
        const slug = generateSlug(formData.title);

        try {
            let error;
            const articleData = {
                title: formData.title,
                slug: slug,
                content_html: formData.content,
                summary: formData.excerpt || formData.content.substring(0, 150) + '...',
                category: formData.category || 'Comunidad',
                featured_image: formData.featured_image,
                meta_title: formData.meta_title,
                meta_description: formData.meta_description,
                social_meta: {
                    x: formData.social_x,
                    linkedin: formData.social_linkedin,
                    facebook: formData.social_facebook,
                    whatsapp: formData.social_whatsapp,
                    instagram: formData.social_instagram
                },
                // keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()).filter(k => k !== '') : [],
                updated_at: new Date().toISOString()
            };

            if (isEditMode) {
                const { error: updateError } = await supabase
                    .from('articles')
                    .update(articleData)
                    .eq('id', id);
                error = updateError;
            } else {
                articleData.author_id = user.id;
                articleData.status = 'published';
                articleData.created_at = new Date().toISOString();
                
                const { error: insertError } = await supabase
                    .from('articles')
                    .insert([articleData]);
                error = insertError;
            }

            if (error) throw error;

            const fullUrl = `${window.location.origin}/blog/${articleData.category}/${articleData.slug}`;
            setPublishedUrl(fullUrl);
            setPublishedTitle(articleData.title);
            setShowSuccessModal(true);
            
            // We don't navigate immediately if we show the modal
            // navigate(forumMode ? '/forum' : '/blog');
        } catch (error) {
            console.error('Error saving post:', error);
            toast({
                title: "Error al publicar",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEOHead 
                title="Crear Nueva Publicación - Community Blog"
                description="Comparte tus conocimientos e ideas con la comunidad de SEO Growthers."
            />
            
            <div className="bg-[#0C0D0D] min-h-screen pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <button 
                        onClick={() => navigate(forumMode ? '/forum' : '/blog')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al {forumMode ? 'Foro' : 'Blog'}
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                {isEditMode ? 'Editar' : (forumMode ? 'Iniciar' : 'Crear')} <span className="text-cyan-400">{forumMode ? 'Debate' : 'Publicación'}</span>
                            </h1>
                            <p className="text-gray-400">Comparte tu experiencia con los demás miembros.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button 
                                variant="outline" 
                                onClick={() => setPreview(!preview)}
                                className="border-slate-800 text-gray-300 hover:bg-slate-800"
                            >
                                {preview ? <Layout size={18} className="mr-2"/> : <Eye size={18} className="mr-2"/>}
                                {preview ? 'Editar' : 'Vista Previa'}
                            </Button>
                            <Button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-cyan-500 hover:bg-cyan-600 text-[#0C0D0D] font-bold px-8 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                            >
                                {loading ? <Loader2 size={18} className="mr-2 animate-spin"/> : <Send size={18} className="mr-2"/>}
                                {isEditMode ? 'Actualizar' : 'Publicar'}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Sidebar Izquierda - Opciones */}
                        <div className={`space-y-6 ${preview ? 'hidden' : 'block'}`}>
                            <Tabs defaultValue="options" className="w-full">
                                <TabsList className="grid grid-cols-2 bg-slate-950 border border-slate-800 p-1 mb-6">
                                    <TabsTrigger value="options" className="text-[10px] uppercase font-bold py-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-[#0C0D0D]">
                                        SEO & Básicos
                                    </TabsTrigger>
                                    <TabsTrigger value="social" className="text-[10px] uppercase font-bold py-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-[#0C0D0D]">
                                        Social Hub
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="options" className="space-y-6 mt-0">
                                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
                                        <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                                            <Layout size={16} className="text-cyan-400" /> Configuración SEO
                                        </h3>
                                        
                                        <div className="space-y-4 pt-2 border-t border-slate-800/50">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                    <ImageIcon size={12} /> Multimedia Principal
                                                </label>
                                                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                                                    <ImageUpload 
                                                        value={formData.featured_image || ''}
                                                        onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                                                        bucket="article-images"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                    <Tag size={12} /> Título de Búsqueda
                                                </label>
                                                <Input 
                                                    name="meta_title"
                                                    value={formData.meta_title}
                                                    onChange={handleChange}
                                                    placeholder="Cómo aparecerá en Google..."
                                                    className="bg-slate-950 border-slate-800 focus:border-cyan-500/50 text-white text-xs"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                    <PenSquare size={12} /> Meta Descripción
                                                </label>
                                                <Textarea 
                                                    name="meta_description"
                                                    value={formData.meta_description}
                                                    onChange={handleChange}
                                                    placeholder="Resumen para motores de búsqueda..."
                                                    className="bg-slate-950 border-slate-800 focus:border-cyan-500/50 text-white min-h-[80px] text-xs resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                    <Tag size={12} /> Palabras Clave (SEO Keywords)
                                                </label>
                                                <Input 
                                                    name="keywords"
                                                    value={formData.keywords}
                                                    onChange={handleChange}
                                                    placeholder="seo, marketing, crecimiento (separadas por coma)"
                                                    className="bg-slate-950 border-slate-800 focus:border-cyan-500/50 text-white text-xs"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                    <Tag size={12} /> Categoría
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Debates', 'Preguntas', 'Showcase'].map((cat) => (
                                                        <button
                                                            key={cat} type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                                                            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                                                                formData.category === cat
                                                                ? 'bg-cyan-500 border-cyan-400 text-[#0C0D0D]'
                                                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                                                            }`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="social" className="space-y-6 mt-0">
                                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                        <h3 className="font-bold text-white flex items-center gap-2 text-sm mb-6">
                                            <Share2 size={16} className="text-cyan-400" /> Social Media Hub
                                        </h3>

                                        <div className="space-y-8">
                                            {/* X (Twitter) */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                                                    <Twitter size={14} className="text-blue-400" /> Publicación para X
                                                </div>
                                                <Textarea 
                                                    name="social_x"
                                                    value={formData.social_x}
                                                    onChange={handleChange}
                                                    placeholder="Escribe el post optimizado para X..."
                                                    className="bg-slate-950 border-slate-800 text-xs min-h-[80px]"
                                                />
                                                <div className="bg-black rounded-xl p-3 border border-white/10 overflow-hidden group">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-8 h-8 rounded-full bg-cyan-500"></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-white">SEO Growthers</span>
                                                            <span className="text-[10px] text-gray-500">@seogrowthers</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-white mb-2 line-clamp-2">{formData.social_x || 'Previsualización de X...'}</p>
                                                    <a href={previewPostUrl} target="_blank" rel="noopener noreferrer" className="block border border-white/10 rounded-xl overflow-hidden hover:ring-1 hover:ring-cyan-500/50 transition-all">
                                                        {formData.featured_image ? <img src={formData.featured_image} className="w-full h-32 object-cover" /> : <div className="w-full h-32 bg-slate-800" />}
                                                        <div className="p-2 bg-slate-900 border-t border-white/5">
                                                            <p className="text-[10px] text-gray-400 uppercase">seogrowthers.com</p>
                                                            <p className="text-xs font-bold text-white line-clamp-1">{formData.meta_title || formData.title || 'Título del Post'}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* LinkedIn Content & Preview */}
                                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                                                    <Linkedin size={14} className="text-[#0A66C2]" /> LinkedIn Message
                                                </div>
                                                <Textarea 
                                                    name="social_linkedin"
                                                    value={formData.social_linkedin}
                                                    onChange={handleChange}
                                                    placeholder="Escribe el mensaje profesional..."
                                                    className="bg-slate-950 border-slate-800 text-xs min-h-[80px]"
                                                />
                                                <div className="bg-slate-900 rounded-lg p-3 border border-white/5 space-y-2">
                                                    <div className="flex gap-2">
                                                        <div className="w-8 h-8 rounded bg-cyan-500"></div>
                                                        <span className="text-xs font-bold text-white">SEO Growthers</span>
                                                    </div>
                                                    <p className="text-xs text-white line-clamp-3">{formData.social_linkedin || 'Previsualización de LinkedIn...'}</p>
                                                    <a href={previewPostUrl} target="_blank" rel="noopener noreferrer" className="block border border-white/10 rounded overflow-hidden hover:ring-1 hover:ring-[#0A66C2]/50 transition-all">
                                                        {formData.featured_image ? <img src={formData.featured_image} className="w-full h-32 object-cover" /> : <div className="w-full h-32 bg-slate-800" />}
                                                        <div className="p-2 bg-slate-800 border-t border-white/5">
                                                            <p className="text-xs font-bold text-white">{formData.title}</p>
                                                            <p className="text-[10px] text-gray-500">seogrowthers.com • 4 min lectura</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Facebook Feed preview */}
                                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                                                    <Facebook size={14} className="text-[#1877F2]" /> Facebook Feed
                                                </div>
                                                <Textarea 
                                                    name="social_facebook"
                                                    value={formData.social_facebook}
                                                    onChange={handleChange}
                                                    placeholder="Mensaje para el feed de Facebook..."
                                                    className="bg-slate-950 border-slate-800 text-xs min-h-[80px]"
                                                />
                                                <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                                    <div className="p-2 pb-0 text-xs text-white/90">{formData.social_facebook || 'Previsualización Facebook...'}</div>
                                                    <a href={previewPostUrl} target="_blank" rel="noopener noreferrer" className="block border-t border-white/5 mt-2 hover:opacity-90 transition-all">
                                                        {formData.featured_image ? <img src={formData.featured_image} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-slate-800" />}
                                                        <div className="p-3 bg-white/5">
                                                            <p className="text-[10px] text-white/50 uppercase">SEOGROWTHERS.COM</p>
                                                            <p className="text-sm font-bold text-white">{formData.title}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Instagram Story/Post Preview */}
                                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                                                    <Instagram size={14} className="text-[#E4405F]" /> Instagram Story
                                                </div>
                                                <Textarea 
                                                    name="social_instagram"
                                                    value={formData.social_instagram}
                                                    onChange={handleChange}
                                                    placeholder="Caption para Instagram..."
                                                    className="bg-slate-950 border-slate-800 text-xs min-h-[80px]"
                                                />
                                                <a href={previewPostUrl} target="_blank" rel="noopener noreferrer" className="block aspect-[9/16] w-32 mx-auto bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl p-[2px] overflow-hidden group hover:scale-105 transition-transform">
                                                    <div className="bg-black w-full h-full rounded-2xl overflow-hidden relative">
                                                        {formData.featured_image ? <img src={formData.featured_image} className="w-full h-full object-cover opacity-60" /> : <div className="w-full h-full bg-slate-800" />}
                                                        <div className="absolute inset-0 p-3 flex flex-col justify-end">
                                                            <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg text-center border border-white/20">
                                                                <p className="text-[8px] font-bold text-white uppercase truncate">{formData.title}</p>
                                                                <p className="text-[6px] text-cyan-400 font-bold">VER ARTÍCULO →</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            {/* WhatsApp Preview */}
                                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                                                    <MessageCircle size={14} className="text-[#25D366]" /> Mensaje de WhatsApp
                                                </div>
                                                <Textarea 
                                                    name="social_whatsapp"
                                                    value={formData.social_whatsapp}
                                                    onChange={handleChange}
                                                    placeholder="Mensaje para grupos/contactos..."
                                                    className="bg-slate-950 border-slate-800 text-xs min-h-[80px]"
                                                />
                                                <div className="bg-[#0b141a] rounded-lg p-2 max-w-[200px] border-l-4 border-cyan-500">
                                                    <a href={previewPostUrl} target="_blank" rel="noopener noreferrer" className="block bg-[#111b21] rounded p-2 overflow-hidden hover:bg-[#1c2c35] transition-colors">
                                                        {formData.featured_image ? <img src={formData.featured_image} className="w-full h-24 object-cover rounded mb-2" /> : <div className="w-full h-24 bg-slate-800 mb-2 rounded" />}
                                                        <p className="text-[10px] font-bold text-blue-400 truncate">{formData.title}</p>
                                                        <p className="text-[9px] text-gray-400 line-clamp-2">{formData.meta_description}</p>
                                                        <p className="text-[8px] text-gray-500 mt-1 italic">seogrowthers.com</p>
                                                    </a>
                                                    <p className="text-[10px] text-white mt-2 leading-tight">{formData.social_whatsapp || 'Tu mensaje aquí...'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Editor Section */}
                        <div className={`lg:col-span-2 space-y-8 ${preview ? 'hidden' : 'block'}`}>
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Sparkles size={14} className="text-cyan-400" /> Título de la publicación
                                </label>
                                <Input 
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ej: Cómo optimizar el Core Web Vitals en 2026"
                                    className="bg-slate-900/50 border-slate-800 text-white text-xl py-6 focus:border-cyan-500/50 transition-all shadow-inner"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <PenSquare size={14} className="text-cyan-400" /> Contenido del artículo
                                </label>
                                <div className="min-h-[500px]">
                                    <NovelEditor 
                                        content={formData.content} 
                                        onChange={handleEditorChange} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className={`lg:col-span-3 bg-slate-900/30 rounded-2xl border border-slate-800 p-8 ${!preview ? 'hidden' : 'block'}`}>
                            <div className="prose prose-invert max-w-none">
                                <h1 className="text-4xl font-bold text-white mb-6">{formData.title || 'Tu Título Aquí'}</h1>
                                {formData.featured_image && (
                                    <img src={formData.featured_image} alt="Preview" className="w-full h-64 object-cover rounded-xl mb-8 border border-slate-800" />
                                )}
                                <div dangerouslySetInnerHTML={{ __html: formData.content || '<em>No hay contenido para previsualizar todavía...</em>' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success & Sharing Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
                    <DialogHeader>
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <DialogTitle className="text-2xl text-center">¡Publicación Armada y Optimizada! 🚀</DialogTitle>
                        <DialogDescription className="text-gray-400 text-center">
                            Tu contenido ya está en vivo. Hemos preparado estos textos para que lo compartas con un solo click.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 my-4">
                        {/* Twitter/X */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Twitter size={12} /> Post para X (Twitter)
                                </span>
                                <Button 
                                    variant="ghost" size="xs" 
                                    className="h-6 text-[10px] hover:bg-white/5"
                                    onClick={() => {
                                        const text = `🚀 Acabo de publicar: "${publishedTitle}" en SEO Growthers.\n\n¡No te lo pierdas! 👇\n${publishedUrl}\n\n#SEO #GrowthMarketing #DigitalStrategy`;
                                        navigator.clipboard.writeText(text);
                                        toast({ title: "Copiado para X" });
                                    }}
                                >
                                    <Copy size={10} className="mr-1" /> Copiar
                                </Button>
                            </div>
                            <p className="text-sm text-gray-300 italic">"🚀 Acabo de publicar: {publishedTitle} en SEO Growthers..."</p>
                        </div>

                        {/* LinkedIn */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Linkedin size={12} /> Post para LinkedIn
                                </span>
                                <Button 
                                    variant="ghost" size="xs" 
                                    className="h-6 text-[10px] hover:bg-white/5"
                                    onClick={() => {
                                        const text = `Estar actualizado en el mundo digital no es una opción, es una necesidad.\n\nHe compartido mis reflexiones sobre "${publishedTitle}" en SEO Growthers.\n\nPuedes leer el artículo completo aquí: ${publishedUrl}\n\n#ProfessionalGrowth #SEO #DigitalMarketing #AI`;
                                        navigator.clipboard.writeText(text);
                                        toast({ title: "Copiado para LinkedIn" });
                                    }}
                                >
                                    <Copy size={10} className="mr-1" /> Copiar
                                </Button>
                            </div>
                            <p className="text-sm text-gray-300 italic">"Estar actualizado en el mundo digital no es una opción..."</p>
                        </div>

                        {/* WhatsApp */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <MessageCircle size={12} /> Mensaje para WhatsApp
                                </span>
                                <Button 
                                    variant="ghost" size="xs" 
                                    className="h-6 text-[10px] hover:bg-white/5"
                                    onClick={() => {
                                        const text = `📢 ¡Mira lo que acabo de publicar!\n\n*${publishedTitle}*\n\nLéelo aquí: ${publishedUrl}`;
                                        navigator.clipboard.writeText(text);
                                        toast({ title: "Copiado para WhatsApp" });
                                    }}
                                >
                                    <Copy size={10} className="mr-1" /> Copiar
                                </Button>
                            </div>
                            <p className="text-sm text-gray-300 italic">"📢 ¡Mira lo que acabo de publicar!..."</p>
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <Button 
                            variant="outline" 
                            className="w-full sm:w-auto border-slate-800 text-gray-400"
                            onClick={() => navigate(forumMode ? '/forum' : '/blog')}
                        >
                            Ir al listado
                        </Button>
                        <Button 
                            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-[#0C0D0D] font-bold"
                            onClick={() => window.open(publishedUrl, '_blank')}
                        >
                            <ExternalLink size={16} className="mr-2" /> Ver mi publicación
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreatePostPage;
