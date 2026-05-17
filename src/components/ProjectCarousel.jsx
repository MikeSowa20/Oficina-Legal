import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistence } from '../hooks/usePersistence';

function ProjectCarousel() {
    const { articles, folders } = usePersistence();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const allProjects = [...articles.map(a => ({...a, type: 'artigo'})), ...folders.map(f => ({...f, type: 'folder'}))]
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);

    useEffect(() => {
        if (allProjects.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allProjects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [allProjects.length]);

    if (allProjects.length === 0) return null;

    const currentProject = allProjects[currentIndex];
    const imageUrl = currentProject.imageUrl || 
                    (currentProject.blocks && currentProject.blocks.find(b => b.type === 'image')?.url) || 
                    'https://via.placeholder.com/800x400?text=Projeto+Legal';

    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-2xl group">
            <div className="w-full h-full relative overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={currentProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="inline-block px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    Últimos Projetos
                </span>
                <h2 className="text-3xl font-bold text-white mb-4 line-clamp-2">
                    {currentProject.title}
                </h2>
                <button 
                    onClick={() => navigate('/detail/' + currentProject.type + '/' + currentProject.id)}
                    className="px-6 py-2 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors cursor-pointer"
                >
                    Ver Detalhes
                </button>
            </div>

            {allProjects.length > 1 && (
                <div className="absolute top-4 right-4 flex gap-2">
                    {allProjects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={'w-3 h-3 rounded-full transition-all ' + (idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60')}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectCarousel;
