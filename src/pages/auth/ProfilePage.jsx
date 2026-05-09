import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader2, Edit2, Check, X, User, FileText, Calendar, Link as LinkIcon, Award, Zap, Star, Trophy, Camera, Twitter, Linkedin, Globe } from 'lucide-react';
import AvatarSelector from '@/components/profile/AvatarSelector.jsx';
import BannerSelector from '@/components/profile/BannerSelector.jsx';
import SkillsPicker from '@/components/profile/SkillsPicker.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress.jsx";
import { Badge } from '@/components/ui/badge.jsx';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ articles: 0, comments: 0, shares: 0, guides: 0 });
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: '', bio: '', username: '', twitter_url: '', linkedin_url: '', website: '' });
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedBanner, setSelectedBanner] = useState('');
  const [profileSkills, setProfileSkills] = useState([]);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate('/login'); return; }
        setUser(user);

        // Fetch profile from profiles table
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id, 
                full_name: user.user_metadata?.full_name || '',
                avatar_url: user.user_metadata?.avatar_url || '/images/iconos/guiaspersonaje.webp',
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single();
          
          if (!createError) profileData = newProfile;
        }

        const resolvedProfile = profileData || { id: user.id };

        // 1. Fetch real article count (author_id = user.id)
        const { count: articleCount } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('author_id', user.id);

        // 2. Fetch comments count (safely catch if table doesn't exist)
        let blogCommentsCount = 0;
        let newsCommentsCount = 0;
        try {
          const { count: bc } = await supabase.from('article_comments').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
          blogCommentsCount = bc;
        } catch (e) {}
        try {
          const { count: nc } = await supabase.from('news_comments').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
          newsCommentsCount = nc;
        } catch (e) {}

        // 3. Fetch guide progress
        const { count: guidesCount } = await supabase
          .from('user_guides_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // 4. Fetch achievements
        const { data: achievementsData } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id);

        setProfile(resolvedProfile);
        setSelectedAvatar(resolvedProfile.avatar_url || '/images/iconos/guiaspersonaje.webp');
        setSelectedBanner(resolvedProfile.banner_url || '');
        setProfileSkills(resolvedProfile.skills_tags || []);
        setAchievements(achievementsData || []);
        
        setStats({ 
          articles: articleCount || 0, 
          comments: (blogCommentsCount || 0) + (newsCommentsCount || 0),
          shares: 0, 
          guides: guidesCount || 0 
        });

        setEditForm({
          full_name: resolvedProfile.full_name || user.user_metadata?.full_name || '',
          bio: resolvedProfile.bio || '',
          username: resolvedProfile.username || '',
          twitter_url: resolvedProfile.twitter_url || '',
          linkedin_url: resolvedProfile.linkedin_url || '',
          website: resolvedProfile.website || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...editForm,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) throw error;
      setProfile(prev => ({ ...prev, ...editForm }));
      setEditing(false);
      toast({ title: 'Perfil actualizado', description: 'Tus datos han sido guardados correctamente.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al guardar', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const checkProfileCompletion = (p) => {
    return p.full_name && p.username && p.bio && p.avatar_url && p.banner_url && p.skills_tags?.length > 0;
  };

  const handleUpdateAvatar = async () => {
    setSaving(true);
    try {
      const wasComplete = checkProfileCompletion(profile);
      const newProfile = { ...profile, avatar_url: selectedAvatar };
      const isNowComplete = checkProfileCompletion(newProfile);
      
      let xpBonus = 0;
      if (!wasComplete && isNowComplete) xpBonus = 20;

      const { error } = await supabase
        .from('profiles')
        .update({
            avatar_url: selectedAvatar,
            xp: (profile.xp || 0) + xpBonus,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => ({ ...prev, avatar_url: selectedAvatar, xp: (prev.xp || 0) + xpBonus }));
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { avatar_url: selectedAvatar } }));
      setIsAvatarDialogOpen(false);
      toast({ 
        title: 'Avatar actualizado', 
        description: xpBonus > 0 ? '¡Perfil completado! +20 XP ganados.' : 'Tu nueva identidad ha sido guardada.' 
      });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar el avatar.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBanner = async () => {
    setSaving(true);
    try {
      const wasComplete = checkProfileCompletion(profile);
      const newProfile = { ...profile, banner_url: selectedBanner };
      const isNowComplete = checkProfileCompletion(newProfile);
      
      let xpBonus = 0;
      if (!wasComplete && isNowComplete) xpBonus = 20;

      const { error } = await supabase
        .from('profiles')
        .update({
            banner_url: selectedBanner,
            xp: (profile.xp || 0) + xpBonus,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => ({ ...prev, banner_url: selectedBanner, xp: (prev.xp || 0) + xpBonus }));
      setIsBannerDialogOpen(false);
      toast({ 
        title: 'Banner actualizado', 
        description: xpBonus > 0 ? '¡Perfil completado! +20 XP ganados.' : 'La cabecera ha sido personalizada.' 
      });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar el banner.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSkills = async () => {
    setSaving(true);
    try {
      const wasComplete = checkProfileCompletion(profile);
      const newProfile = { ...profile, skills_tags: profileSkills };
      const isNowComplete = checkProfileCompletion(newProfile);
      
      let xpBonus = 0;
      if (!wasComplete && isNowComplete) xpBonus = 20;

      const { error } = await supabase
        .from('profiles')
        .update({
            skills_tags: profileSkills,
            xp: (profile.xp || 0) + xpBonus,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => ({ ...prev, skills_tags: profileSkills, xp: (prev.xp || 0) + xpBonus }));
      setIsSkillsDialogOpen(false);
      toast({ 
        title: 'Habilidades actualizadas', 
        description: xpBonus > 0 ? '¡Perfil completado! +20 XP ganados.' : 'Tus especialidades han sido guardadas.' 
      });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron actualizar las habilidades.' });
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (skill) => {
    setProfileSkills(prev => 
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };


  const getRankInfo = (xp = 0) => {
    if (xp >= 2001) return { name: 'Master Pathbreaker', color: 'text-amber-400', border: 'border-amber-500/50', icon: <Trophy className="w-5 h-5" />, next: null };
    if (xp >= 501) return { name: 'Elite Explorer', color: 'text-fuchsia-400', border: 'border-fuchsia-500/50', icon: <Star className="w-5 h-5" />, next: 2001 };
    if (xp >= 101) return { name: 'Data Voyager', color: 'text-purple-400', border: 'border-purple-500/50', icon: <Zap className="w-5 h-5" />, next: 501 };
    return { name: 'Novato Neural', color: 'text-cyan-400', border: 'border-cyan-500/50', icon: <Award className="w-5 h-5" />, next: 101 };
  };

  const rank = getRankInfo(profile?.xp);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: 'Sesión cerrada', description: 'Has salido del ecosistema de forma segura.' });
      navigate('/login');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al cerrar sesión', description: error.message });
    }
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
  const joinDate = user?.created_at ? format(new Date(user.created_at), "MMMM 'de' yyyy", { locale: es }) : '';

  const dashboardMenu = [
    { label: 'Blog Comunitario', href: '/blog', icon: <FileText className="w-5 h-5" />, desc: 'Debates' },
    { label: 'Recursos & Guías', href: '/resources', icon: <User className="w-5 h-5" />, desc: 'Aprender' },
    { label: 'Noticias SEO', href: '/news', icon: <FileText className="w-5 h-5" />, desc: 'Actualidad' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-white font-sans min-h-screen relative overflow-hidden">
      <Helmet>
        <title>{displayName} — Dashboard | Lumina Quest</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Atmospheric Background glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <main className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ── Left Sidebar (Identity) ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="bg-[#0e0e15] border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl">
              {/* Subtle Banner */}
              <div className="relative h-32 group">
                <img 
                  src={profile?.banner_url || "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1920&auto=format&fit=crop"} 
                  alt="Banner" 
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-transparent" />
                <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-xl p-2 opacity-0 group-hover:opacity-100 transition hover:bg-white/10">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#12111A] border-white/10 text-white max-w-3xl">
                    <DialogHeader><DialogTitle>Cabecera Estelar</DialogTitle></DialogHeader>
                    <BannerSelector currentBanner={selectedBanner} onSelect={setSelectedBanner} onSave={handleUpdateBanner} isSaving={saving} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Avatar & Profile Details */}
              <div className="px-6 pb-8 relative -mt-16 flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-700" />
                  <div className="relative w-28 h-28 rounded-full border-4 border-[#0e0e15] overflow-hidden bg-slate-900 z-10">
                      <img
                        className="w-full h-full object-cover scale-[1.35]"
                        alt={displayName}
                        src={profile?.avatar_url || "/images/iconos/guiaspersonaje.webp"}
                      />
                  </div>
                  <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="absolute bottom-0 right-0 z-20 bg-[#1A1825] border border-white/10 text-purple-400 p-2 rounded-full hover:scale-110 active:scale-95 transition-all">
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#12111A] border-white/10 text-white max-w-2xl">
                        <DialogHeader><DialogTitle className="text-xl font-bold text-purple-400">Identidad Virtual</DialogTitle></DialogHeader>
                        <AvatarSelector currentAvatar={selectedAvatar} onSelect={setSelectedAvatar} onSave={handleUpdateAvatar} isSaving={saving} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border ${rank.border} ${rank.color} text-[10px] font-bold uppercase tracking-widest mb-3`}>
                    {rank.icon}
                    {rank.name}
                </div>

                {editing ? (
                  <input type="text" value={editForm.full_name} onChange={e => setEditForm(p => ({ ...p, full_name: e.target.value }))} className="w-full bg-white/5 border border-purple-500/50 rounded-lg px-3 py-2 text-white font-bold mb-2 text-center" placeholder="Tu nombre" />
                ) : (
                  <h1 className="text-2xl font-bold font-headline tracking-tight text-white mb-1">{displayName}</h1>
                )}

                {editing ? (
                  <input type="text" value={editForm.username} onChange={e => setEditForm(p => ({ ...p, username: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-slate-400 text-sm mb-2 text-center" placeholder="@username" />
                ) : (
                  <p className="text-purple-400 text-sm font-medium mb-2">{profile?.username ? `@${profile.username}` : user?.email}</p>
                )}

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1.5 my-4">
                  {profile?.skills_tags?.map(skill => (
                    <span key={skill} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md text-[10px] py-1 px-2 font-medium">
                      {skill}
                    </span>
                  ))}
                  {!editing && (
                    <Dialog open={isSkillsDialogOpen} onOpenChange={setIsSkillsDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="text-[10px] text-slate-500 hover:text-purple-400 transition-colors flex items-center gap-1 py-1">
                          <Edit2 className="w-3 h-3" /> Editar Habilidades
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#12111A] border-white/10 text-white">
                        <DialogHeader><DialogTitle>Arsenal Técnico</DialogTitle></DialogHeader>
                        <SkillsPicker selectedSkills={profileSkills} onToggle={toggleSkill} onSave={handleUpdateSkills} isSaving={saving} />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {editing ? (
                  <textarea value={editForm.bio} onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))} className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none" rows={3} placeholder="Bio..." />
                ) : profile?.bio ? (
                  <p className="text-slate-400 text-xs leading-relaxed max-w-[250px] mx-auto">{profile.bio}</p>
                ) : null}

                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {editing ? (
                    <div className="w-full space-y-3">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-cyan-500/50 transition-all">
                        <Twitter className="w-4 h-4 text-cyan-400" />
                        <input type="text" value={editForm.twitter_url} onChange={e => setEditForm(p => ({ ...p, twitter_url: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600" placeholder="Twitter URL" />
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-blue-500/50 transition-all">
                        <Linkedin className="w-4 h-4 text-blue-500" />
                        <input type="text" value={editForm.linkedin_url} onChange={e => setEditForm(p => ({ ...p, linkedin_url: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600" placeholder="LinkedIn URL" />
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-emerald-500/50 transition-all">
                        <Globe className="w-4 h-4 text-emerald-400" />
                        <input type="text" value={editForm.website} onChange={e => setEditForm(p => ({ ...p, website: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600" placeholder="Website URL" />
                      </div>
                    </div>
                  ) : (
                    <>
                      {profile?.twitter_url && (
                        <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all group">
                          <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                      {profile?.linkedin_url && (
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group">
                          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                      {profile?.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all group">
                          <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 w-full flex flex-col gap-2">
                  {editing ? (
                    <>
                      <button onClick={handleSaveProfile} disabled={saving} className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl text-sm transition-all flex justify-center items-center gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Guardar
                      </button>
                      <button onClick={() => setEditing(false)} className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm transition-all border border-white/10">
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate('/blog/create')} className="w-full py-2.5 bg-primary text-on-primary font-bold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] flex justify-center items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" /> Crear Publicación
                      </button>
                      <button onClick={() => setEditing(true)} className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-medium rounded-xl text-sm transition-all border border-purple-500/20 flex justify-center items-center gap-2">
                        <Edit2 className="w-3.5 h-3.5" /> Editar Perfil
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-4 shadow-2xl">
              <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 px-2">Explorar Destinos</h3>
              <nav className="flex flex-col gap-1">
                {dashboardMenu.map(item => (
                  <Link key={item.href} to={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors group">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <span className="text-[10px] text-slate-500">{item.desc}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
            
            <button onClick={handleLogout} className="w-full py-3 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all border border-transparent hover:border-red-500/20 flex justify-center items-center gap-2">
               Cerrar Módulo de Conexión
            </button>

          </aside>

          {/* ── Right Main Dashboard ── */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Header Area */}
            <header className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-headline">Panel Central Lumina</h2>
                <p className="text-sm text-slate-400">Analíticas en tiempo real y progresión.</p>
              </div>
            </header>

            {/* Top Grid: XP & Status */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Main XP Card */}
              <div className="col-span-1 md:col-span-8 bg-[#0e0e15] border border-white/5 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute right-0 top-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20" />
                 <div className="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-purple-400 block mb-1">Ruta de Aprendizaje</span>
                    <span className="text-3xl font-extrabold text-white">{profile?.xp || 0} <span className="text-slate-500 text-sm font-normal">XP de {rank.next || 'MAX'}</span></span>
                  </div>
                  {rank.next && (
                    <span className="text-xs text-slate-400 font-medium">Nivel {Math.floor((profile?.xp || 10) / 100) + 1}</span>
                  )}
                </div>
                <Progress 
                  value={rank.next ? ((profile?.xp || 0) / rank.next) * 100 : 100} 
                  className="h-2.5 bg-black ring-1 ring-white/5 rounded-full" 
                  indicatorColor="bg-gradient-to-r from-purple-500 to-cyan-400"
                />
              </div>

              {/* Status Nodes */}
              <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
                <div className="bg-[#0e0e15] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 font-medium mb-1 block">Artículos Creados</span>
                    <span className="text-xl font-bold text-cyan-400">{stats.articles}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20"><FileText className="w-5 h-5 text-cyan-400" /></div>
                </div>
                <div className="bg-[#0e0e15] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 font-medium mb-1 block">Misiones (Guías)</span>
                    <span className="text-xl font-bold text-fuchsia-400">{stats.guides}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20"><Award className="w-5 h-5 text-fuchsia-400" /></div>
                </div>
              </div>
            </div>

            {/* Secondary Grid (Trophies & Quests) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* Trophies Gallery */}
              <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Galería de Reliquias
                  </h3>
                  <button className="text-xs font-bold text-purple-400 hover:text-purple-300">Ver todas</button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                      { key: 'first_post', label: 'Iniciador', icon: '✍️', desc: 'Primer Artículo', active: stats.articles > 0 },
                      { key: 'commenter', label: 'Debatiente', icon: '💬', desc: '5 Comentarios', active: stats.comments >= 5 },
                      { key: 'guides', label: 'Pionero', icon: '🎓', desc: '3 Guías Completadas', active: stats.guides >= 3 },
                      { key: 'high_xp', label: 'Ascendido', icon: '🚀', desc: '+1000 XP Total', active: (profile?.xp || 0) >= 1000 },
                  ].map(trophy => (
                      <div key={trophy.key} className={`relative p-4 rounded-2xl border transition-all overflow-hidden ${trophy.active ? 'bg-gradient-to-b from-[#161420] to-[#0e0e15] border-purple-500/30' : 'bg-black/20 border-white/5 grayscale opacity-50'}`}>
                          {trophy.active && <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 blur-xl rounded-full" />}
                          <div className={`text-2xl mb-2 flex items-center justify-center w-10 h-10 rounded-xl ${trophy.active ? 'bg-white/5 border border-white/10' : 'bg-transparent'}`}>{trophy.icon}</div>
                          <h4 className="text-sm font-bold text-white mb-0.5">{trophy.label}</h4>
                          <p className="text-[10px] text-slate-500">{trophy.desc}</p>
                      </div>
                  ))}
                </div>
              </div>

              {/* Current Quests */}
              <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" /> Misiones Activas
                </h3>
                
                <div className="space-y-3">
                  {/* Quest 1 */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-start gap-4 hover:border-white/10 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Actualizar Arsenal Técnico</h4>
                      <p className="text-xs text-slate-500 mt-1">Completa tu perfil al 100% añadiendo al menos una habilidad para obtener +20 XP.</p>
                    </div>
                  </div>
                  {/* Quest 2 */}
                  <Link to="/resources" className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-start gap-4 hover:border-cyan-500/20 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Decodificación de Conocimiento</h4>
                      <p className="text-xs text-slate-500 mt-1">Completa la guía de "Google AI Studio 2026" para un multiplicador de conocimiento.</p>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
