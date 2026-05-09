
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { calculateSeoScore } from '@/lib/seoHelpers';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Edit, CheckCircle, XCircle, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SeoAudit = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    try {
      // Fetch from 'articles' table
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const audited = data.map(article => {
        // Map 'articles' schema to what calculateSeoScore expects
        const meta = article.content || {};
        const mappedArticle = {
          ...article,
          content: article.content_html,
          seo_title: meta.seo_title || article.title,
          seo_description: article.summary,
          keywords: meta.keywords || [],
          featured_image_alt: meta.featured_image_alt
        };

        const { score, breakdown } = calculateSeoScore(mappedArticle);
        return { ...article, seoScore: score, breakdown };
      });

      setArticles(audited);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Auditoría SEO</h1>
        <Button variant="outline" className="text-gray-400 border-slate-700">
          <Filter className="mr-2 h-4 w-4" /> Filtrar
        </Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-800">
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="text-gray-300 w-[400px]">Artículo</TableHead>
              <TableHead className="text-gray-300">Puntuación</TableHead>
              <TableHead className="text-gray-300">Estado</TableHead>
              <TableHead className="text-gray-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">Analizando artículos...</TableCell>
              </TableRow>
            ) : articles.map((article) => (
              <TableRow key={article.id} className="border-slate-800 hover:bg-slate-800/50">
                <TableCell>
                  <p className="font-medium text-white line-clamp-1">{article.title}</p>
                  <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="py-1 text-xs text-gray-500 hover:text-cyan-400">
                        Ver desglose
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 mt-2">
                          {article.breakdown.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                              {item.passed ? (
                                <CheckCircle size={12} className="text-green-500" />
                              ) : (
                                <XCircle size={12} className="text-red-500" />
                              )}
                              {item.label}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold ${getScoreColor(article.seoScore)}`}>
                      {article.seoScore}
                    </span>
                    <span className="text-xs text-gray-500">/ 100</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${article.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {article.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/articles/${article.id}/edit`}>
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30">
                      <Edit size={16} className="mr-2" /> Corregir
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SeoAudit;
