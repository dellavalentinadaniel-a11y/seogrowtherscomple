import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await db.auth.login(email, password);
      
      if (error) {
        toast({
          title: "Error de autenticación",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate('/admin/articles');
      }
    } catch (err) {
      toast({
        title: "Error del sistema",
        description: "Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Admin</h1>
          <p className="text-gray-400">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="admin@agency.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="text-xs text-gray-500 text-center bg-slate-800/50 p-3 rounded">
            Credenciales Demo: admin@agency.com / admin123
          </div>

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;