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
  Heading1, Heading2, Heading3, Quote, Code,
  AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUploadModal from '@/components/admin/ImageUploadModal';
import { toast } from '@/components/ui/use-toast';

const MenuBar = ({ editor, onImageClick }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-slate-700 p-2 flex flex-wrap gap-1 bg-slate-800/50 rounded-t-lg sticky top-0 z-20 backdrop-blur-sm">
      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><Bold size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><Italic size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><UnderlineIcon size={16} /></Button>
      </div>

      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'} title="H2"><Heading2 size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'} title="H3"><Heading3 size={16} /></Button>
      </div>
      
      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><AlignLeft size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><AlignCenter size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><AlignRight size={16} /></Button>
      </div>

      <div className="flex gap-1 border-r border-slate-700 pr-2 mr-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><List size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><ListOrdered size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><Quote size={16} /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'bg-slate-700 text-cyan-400' : 'text-gray-400 hover:text-white'}><Code size={16} /></Button>
      </div>

      <div className="flex gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={onImageClick} className="text-gray-400 hover:text-white" title="Insertar Imagen"><ImageIcon size={16} /></Button>
      </div>
    </div>
  );
};

const RichTextEditor = ({ content, onChange, placeholder = "Escribe aquí el contenido..." }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4, 5, 6] }, 
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
        placeholder,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4 text-gray-300',
      },
    },
  });

  const handleImageSelected = (url, altText) => {
    if (editor) {
      if (altText) {
        editor.chain().focus().setImage({ src: url, alt: altText }).run();
      } else {
         editor.chain().focus().setImage({ src: url }).run();
      }
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900/50">
      <MenuBar editor={editor} onImageClick={() => setIsImageModalOpen(true)} />
      <EditorContent editor={editor} />
      
      {editor && (
        <div className="border-t border-slate-800 p-2 text-xs text-gray-500 flex justify-end gap-4">
           <span>{editor.storage.characterCount?.words?.() || 0} palabras</span>
           <span>{editor.storage.characterCount?.characters?.() || 0} caracteres</span>
        </div>
      )}

      <ImageUploadModal 
        isOpen={isImageModalOpen} 
        onClose={() => setIsImageModalOpen(false)} 
        onImageSelected={handleImageSelected}
        requireAlt={true} 
      />
    </div>
  );
};

export default RichTextEditor;