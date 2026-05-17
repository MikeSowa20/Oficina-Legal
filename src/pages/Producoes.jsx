import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { usePersistence } from '../hooks/usePersistence';

function Producoes() {
    const { articles, folders } = usePersistence();
    const location = useLocation();
    const navigate = useNavigate();

    const goToDetail = (type, id) => {
        navigate('/detail/' + type + '/' + id);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-cyan-950 py-16 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Produções</h1>
                <div className="flex justify-center gap-8 mt-8">
                    <Link 
                        to="/producoes/artigos" 
                        className={'px-6 py-2 rounded-full font-bold transition-colors ' + (location.pathname.includes('artigos') ? 'bg-amber-500 text-cyan-950' : 'bg-cyan-800 hover:bg-cyan-700')}
                    >
                        Artigos
                    </Link>
                    <Link 
                        to="/producoes/folders" 
                        className={'px-6 py-2 rounded-full font-bold transition-colors ' + (location.pathname.includes('folders') ? 'bg-amber-500 text-cyan-950' : 'bg-cyan-800 hover:bg-cyan-700')}
                    >
                        Folders
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4">
                <Routes>
                    <Route path="/" element={
                        <div className="text-center py-20">
                            <h2 className="text-2xl text-cyan-900 font-bold">Selecione uma categoria acima</h2>
                        </div>
                    } />
                    <Route path="artigos" element={
                        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
                            {articles.length === 0 ? (
                                <p className="text-center text-gray-500 py-10">Nenhum artigo disponível.</p>
                            ) : (
                                articles.map(art => {
                                    const firstImage = art.blocks?.find(b => b.type === 'image')?.url;
                                    const firstText = art.content || art.blocks?.find(b => b.type === 'text')?.content || '';
                                    
                                    return (
                                        <div key={art.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow border border-gray-100">
                                            {firstImage && (
                                                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                                                    <img 
                                                        src={firstImage} 
                                                        alt={art.title} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                            )}
                                            <div className={`p-8 flex-1 flex flex-col justify-center ${!firstImage ? 'w-full' : ''}`}>
                                                <h3 className="text-2xl font-bold text-cyan-950 mb-4">{art.title}</h3>
                                                <p className="text-gray-600 line-clamp-3 mb-6 text-lg leading-relaxed">
                                                    {firstText}
                                                </p>
                                                <button 
                                                    onClick={() => goToDetail('artigo', art.id)}
                                                    className="inline-flex items-center text-cyan-700 font-bold hover:text-cyan-600 transition-colors group cursor-pointer"
                                                >
                                                    Ler mais <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    } />
                    <Route path="folders" element={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {folders.length === 0 ? (
                                <p className="col-span-full text-center text-gray-500">Nenhum folder disponível.</p>
                            ) : (
                                folders.map(fold => (
                                    <div 
                                        key={fold.id} 
                                        onClick={() => goToDetail('folder', fold.id)}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                                    >
                                        <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                                            <img 
                                                src={fold.imageUrl || (fold.blocks && fold.blocks.find(b => b.type === 'image')?.url)} 
                                                alt={fold.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                            />
                                        </div>
                                        <div className="p-4 bg-cyan-900 text-white text-center font-bold">
                                            {fold.title}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default Producoes;
