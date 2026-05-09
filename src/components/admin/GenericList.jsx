import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Eye, Trash2, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const GenericList = ({ 
  title, 
  description, 
  tableName, 
  basePath, 
  columns = [],
  createLabel = "Crear Nuevo",
  searchPlaceholder = "Buscar..."
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [page, statusFilter]); // Re-fetch when filters change

  const fetchItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      // Note: Full text search usually requires more complex setup, for now simple client-side filter for displayed items or exact match if supported.
      // Better: filter client side for small datasets or use ilike for simple text
      
      const { data, error } = await query;
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "No se pudieron cargar los datos.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.')) return;
    
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
      toast({ title: "Eliminado", description: "Elemento eliminado correctamente." });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo eliminar el elemento.", variant: "destructive" });
    }
  };

  // Client side search filtering
  const filteredItems = items.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return item.title?.toLowerCase().includes(searchLower) || 
           item.name?.toLowerCase().includes(searchLower);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </div>
        <Button onClick={() => navigate(`${basePath}/new`)} className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" /> {createLabel}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 flex-1 bg-slate-800/50 rounded-md px-3 border border-slate-700">
          <Search className="text-gray-400 h-4 w-4" />
          <Input 
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-500 h-9"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-700">
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
              <SelectItem value="draft">Borrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-900">
            <TableRow className="border-slate-800 hover:bg-slate-900">
              {columns.map((col, idx) => (
                <TableHead key={idx} className="text-gray-400">{col.header}</TableHead>
              ))}
              <TableHead className="text-right text-gray-400">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-10 text-gray-500">Cargando...</TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-10 text-gray-500">No se encontraron elementos.</TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} className="border-slate-800 hover:bg-slate-800/50">
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className="text-gray-300">
                       {col.render ? col.render(item) : item[col.accessor]}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`${basePath}/${item.id}/edit`)} className="hover:text-yellow-400">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Simple Control */}
      <div className="flex justify-center gap-2">
         <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border-slate-700 text-gray-400"
         >
            Anterior
         </Button>
         <span className="flex items-center text-gray-400 text-sm">Página {page}</span>
         <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPage(p => p + 1)}
            disabled={items.length < pageSize}
            className="border-slate-700 text-gray-400"
         >
            Siguiente
         </Button>
      </div>
    </div>
  );
};

export default GenericList;