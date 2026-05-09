import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Image as ImageIcon, 
  Heading1, Heading2, Heading3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUploadModal from '@/components/admin/ImageUploadModal';
import { toast } from '@/components/ui/use-toast';

const MenuBar = ({ editor, onImageClick }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-slate-700 p-2 flex flex-wrap gap-1 bg-slate-800/50 rounded-t-lg sticky top-0 z-20 backdrop-blur-sm">
      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
        >
          <UnderlineIcon size={16} />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
          title="Título Principal (H1)"
        >
          <Heading1 size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
          title="Subtítulo (H2)"
        >
          <Heading2 size={16} />
        </Button>
         <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
          title="Sección (H3)"
        >
          <Heading3 size={16} />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
        >
          <List size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}
        >
          <ListOrdered size={16} />
        </Button>
      </div>

      <div className="flex gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onImageClick}
          className="text-gray-400 hover:text-white"
          title="Insertar Imagen con Alt Text"
        >
          <ImageIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

const ArticleEditor = ({ content, onChange }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, 
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Escribe tu artículo aquí... Asegúrate de usar solo un H1.',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-4 text-gray-300',
      },
    },
  });

  const handleImageSelected = (url, altText) => {
    if (editor) {
      if (!altText) {
        toast({
          title: "Texto alternativo requerido",
          description: "Por favor añade una descripción para la imagen por accesibilidad y SEO.",
          variant: "destructive"
        });
        return; 
      }
      editor.chain().focus().setImage({ src: url, alt: altText }).run();
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900/50">
      <MenuBar editor={editor} onImageClick={() => setIsImageModalOpen(true)} />
      <EditorContent editor={editor} />
      <ImageUploadModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)} 
        onImageSelected={handleImageSelected}
        requireAlt={true} 
      />
    </div>
  );
};

export default ArticleEditor;