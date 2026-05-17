import { useParams, useNavigate } from 'react-router-dom';
import { usePersistence } from '../hooks/usePersistence';
import RichContentRenderer from '../components/RichContentRenderer';
import { useEffect } from 'react';

function ContentDetail() {
    const { type, id } = useParams();
    const { articles, folders, actions } = usePersistence();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const list = type === 'artigo' ? articles : type === 'folder' ? folders : actions;
    const item = list.find(i => i.id.toString() === id);

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Item não encontrado</h2>
                    <button onClick={() => navigate('/')} className="text-cyan-700 font-bold hover:underline">Voltar para Home</button>
                </div>
            </div>
        );
    }

    const blocks = item.blocks || [
        { type: 'text', content: item.fullDesc || item.content || '' }
    ];

    return (
        <div className="min-h-screen bg-white py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-8 text-cyan-700 font-bold hover:underline cursor-pointer flex items-center gap-2 transition-all hover:gap-3"
                >
                    <span>←</span> Voltar
                </button>
                
                <header className="mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-950 mb-4 leading-tight">
                        {item.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                        {item.date && (
                            <span className="flex items-center gap-1">
                                <span className="text-cyan-600">📅</span> {new Date(item.date).toLocaleDateString('pt-BR')}
                            </span>
                        )}
                        <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                            {type}
                        </span>
                    </div>
                </header>

                <div className="prose prose-cyan max-w-none">
                    <RichContentRenderer blocks={blocks} />
                </div>
            </div>
        </div>
    );
}

export default ContentDetail;
