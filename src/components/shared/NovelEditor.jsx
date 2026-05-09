import React, { useState } from 'react';
import { 
  EditorRoot, 
  EditorContent, 
  StarterKit, 
  TiptapLink,
  TiptapImage,
  TiptapUnderline,
  Color,
  TextStyle,
  Placeholder,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorBubble,
  EditorBubbleItem,
  handleCommandNavigation
} from 'novel';
import TextAlign from '@tiptap/extension-text-align';
import { 
  Bold, Italic, Underline, Strikethrough, Code, 
  Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, ImageIcon, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo, Redo, Link as LinkIcon, Unlink
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/customSupabaseClient';

const suggestionItems = [
  {
    title: 'Texto',
    description: 'Empieza a escribir texto normal.',
    searchTerms: ['p', 'paragraph'],
    icon: <div className="p-1 border border-slate-700 bg-slate-800 rounded"><span className="text-gray-400">T</span></div>,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('paragraph').run();
    },
  },
  {
    title: 'Título 1',
    description: 'Título de sección principal.',
    searchTerms: ['title', 'big', 'large'],
    icon: <Heading1 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
    },
  },
  {
    title: 'Título 2',
    description: 'Título de sección secundaria.',
    searchTerms: ['subtitle', 'medium'],
    icon: <Heading2 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
    },
  },
  {
    title: 'Título 3',
    description: 'Subtítulo.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading3 size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
    },
  },
  {
    title: 'Lista con viñetas',
    description: 'Crea una lista de viñetas.',
    searchTerms: ['unordered', 'point'],
    icon: <List size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Lista numerada',
    description: 'Crea una lista con números.',
    searchTerms: ['ordered'],
    icon: <ListOrdered size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Cita',
    description: 'Captura una cita relevante.',
    searchTerms: ['blockquote'],
    icon: <Quote size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: 'Imagen rápida',
    description: 'Inserta una imagen mediante una URL externa.',
    searchTerms: ['image', 'img', 'picture'],
    icon: <ImageIcon size={18} className="text-gray-400" />,
    command: ({ editor, range }) => {
      const url = window.prompt("Ingresa la URL de la imagen:");
      if (url) {
        editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
      } else {
        editor.chain().focus().deleteRange(range).run();
      }
    },
  }
];

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const ToolbarButton = ({ onClick, isActive, disabled, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md transition-colors ${
        isActive
          ? 'bg-cyan-500/20 text-cyan-400'
          : 'text-gray-400 hover:text-white hover:bg-slate-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL del enlace:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('URL de la imagen:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 mb-2 bg-slate-900 border border-slate-700 rounded-t-lg sticky top-0 z-40 shadow-sm overflow-x-auto">
      {/* Undo / Redo */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Deshacer">
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Rehacer">
          <Redo size={16} />
        </ToolbarButton>
      </div>

      {/* Headings */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Título 1">
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Título 2">
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Título 3">
          <Heading3 size={18} />
        </ToolbarButton>
      </div>

      {/* Formatting */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Negrita">
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Cursiva">
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Subrayado">
          <Underline size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Tachado">
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Código en línea">
          <Code size={16} />
        </ToolbarButton>
      </div>

      {/* Alignments */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Alinear izquierda">
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Centrar">
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Alinear derecha">
          <AlignRight size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justificar">
          <AlignJustify size={16} />
        </ToolbarButton>
      </div>

      {/* Lists & Quotes */}
      <div className="flex items-center border-r border-slate-700 pr-2 mr-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Lista viñetas">
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Lista numerada">
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Citar">
          <Quote size={16} />
        </ToolbarButton>
      </div>

      {/* Media & Links */}
      <div className="flex items-center">
        <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Añadir enlace">
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} title="Quitar enlace">
          <Unlink size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => window.dispatchEvent(new CustomEvent('novelImageDialog'))} title="Insertar imagen">
          <ImageIcon size={16} />
        </ToolbarButton>
      </div>
    </div>
  );
};

// Internal component for Image Upload Modal
const NovelImageDialog = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('novelImageDialog', handleOpen);
    return () => window.removeEventListener('novelImageDialog', handleOpen);
  }, []);

  const handleUpload = async () => {
    if (!file || !editor) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('article-images').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(fileName);
      editor.chain().focus().setImage({ src: publicUrl, alt: altText }).run();
      setOpen(false);
      setFile(null);
      setAltText('');
    } catch (err) {
      console.error(err);
      alert('Error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Insertar Imagen</DialogTitle>
          <DialogDescription className="text-slate-400">
            Sube una imagen desde tu dispositivo. Opcionalmente, agrega texto alternativo para SEO.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">Archivo</Label>
            <Input 
              id="picture" 
              type="file" 
              accept="image/*"
              className="col-span-3 bg-slate-800 border-slate-700" 
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alt" className="text-right text-xs">Atributo Alt (Opcional)</Label>
            <Input 
              id="alt" 
              placeholder="Descripción de la imagen" 
              className="col-span-3 bg-slate-800 border-slate-700" 
              value={altText}
              onChange={e => setAltText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !file} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {uploading ? 'Subiendo...' : 'Subir e Insertar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditorUpdater = ({ content, editor }) => {
  React.useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      if (content.startsWith('<')) {
        editor.commands.setContent(content);
      } else if (content.startsWith('{')) {
        try {
          editor.commands.setContent(JSON.parse(content));
        } catch (e) {
          console.error("Error updating JSON content", e);
        }
      }
    }
  }, [content, editor]);
  return null;
};

const DEFAULT_EXTENSIONS = [
  StarterKit.configure({
    bulletList: { HTMLAttributes: { class: "list-disc list-outside leading-3 -mt-2" } },
    orderedList: { HTMLAttributes: { class: "list-decimal list-outside leading-3 -mt-2" } },
    listItem: { HTMLAttributes: { class: "leading-normal -mb-2" } },
    blockquote: { HTMLAttributes: { class: "border-l-4 border-cyan-500 pl-4 py-2 italic text-gray-300" } },
    codeBlock: { HTMLAttributes: { class: "rounded-sm bg-slate-800 p-4 font-mono font-medium text-gray-200" } },
    code: { HTMLAttributes: { class: "rounded-md bg-slate-800 px-1.5 py-1 font-mono font-medium text-gray-200" } },
    horizontalRule: { HTMLAttributes: { class: "border-t border-slate-700 my-8" } },
    dropcursor: { color: "#06b6d4", width: 2 },
  }),
  TiptapLink.configure({
    HTMLAttributes: { class: "text-cyan-500 underline underline-offset-4 cursor-pointer hover:text-cyan-400" },
  }),
  TiptapImage.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: { class: "rounded-lg border border-slate-700 max-h-[400px] object-cover" },
  }),
  TiptapUnderline,
  Color,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];

const NovelEditor = ({ content, onChange, placeholder = 'Presiona "/" para ver comandos o usar el menú superior...' }) => {
  const [editorInstance, setEditorInstance] = useState(null);
  
  const extensions = React.useMemo(() => [
    ...DEFAULT_EXTENSIONS,
    Placeholder.configure({
      placeholder: placeholder,
    })
  ], [placeholder]);

  return (
    <div className="relative w-full min-h-[400px] border border-slate-800 bg-slate-900/50 rounded-lg shadow-inner text-white focus-within:border-cyan-500/50 transition-all font-sans flex flex-col">
      <Toolbar editor={editorInstance} />
      <NovelImageDialog editor={editorInstance} />
      <EditorRoot>
        <EditorContent
          className="min-h-[350px] outline-none prose prose-invert prose-headings:text-cyan-400 max-w-none px-4 pb-4 flex-1"
          initialContent={content && content.startsWith('{') ? JSON.parse(content) : undefined}
          extensions={extensions}
          onUpdate={({ editor }) => {
            setEditorInstance(editor);
            onChange(editor.getHTML());
          }}
          editorProps={{
             handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class: 'prose prose-invert max-w-none prose-headings:text-cyan-400 prose-a:text-cyan-500 focus:outline-none min-h-[350px] p-4',
            },
          }}
          onCreate={({ editor }) => {
            if (content) {
               if (content.startsWith('<')) {
                 editor.commands.setContent(content);
               } else if (content.startsWith('{')) {
                 try {
                   editor.commands.setContent(JSON.parse(content));
                 } catch (e) {
                   console.error("Error parsing JSON content", e);
                 }
               }
            }
            setEditorInstance(editor);
          }}
        >
          <EditorUpdater content={content} editor={editorInstance} />
          {/* Menú Flotante de Formato (Bubble Menu) */}
          <EditorBubble className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-md p-1 shadow-xl">
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleBold().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Bold size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Italic size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleUnderline().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Underline size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleStrike().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Strikethrough size={16} />
             </EditorBubbleItem>
             <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleCode().run()}
              className="p-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-sm cursor-pointer"
            >
              <Code size={16} />
             </EditorBubbleItem>
          </EditorBubble>

          {/* Menú de Comandos mediante tecla '/' */}
          <EditorCommand className="z-50 bg-slate-800 border border-slate-700 shadow-xl rounded-lg overflow-hidden flex flex-col w-64 max-h-[300px] overflow-y-auto">
            <EditorCommandEmpty className="px-4 py-2 text-sm text-gray-400">
              No hay resultados
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 cursor-pointer flex-row transition-colors w-full aria-selected:bg-cyan-500/20 aria-selected:text-cyan-400"
                  key={item.title}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded border border-slate-700 bg-slate-900 text-gray-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-200">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default NovelEditor;
