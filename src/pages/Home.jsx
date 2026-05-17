import { useLoading } from '../context/LoadingContext';
import uepg from '../assets/uepg.jpg';
import AcoesMes from '../components/AcoesMes';
import LegalTips from '../components/LegalTips';
import QuemSomos from '../components/QuemSomos';
import ProjectCarousel from '../components/ProjectCarousel';

function Home() {
    const { showLoading, hideLoading } = useLoading();

    const simulateLoading = (variant) => {
        showLoading({ 
            message: `Carregando exemplo (${variant})...`, 
            variant: variant 
        });
        
        // Simula uma requisição de 2 segundos
        setTimeout(() => {
            hideLoading();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-[url(./assets/uepg.jpg)] bg-cover bg-center min-h-[60vh] flex items-center justify-around grid-cols-2 relative p-15 py-30">
                <div className="z-10 w-full max-w-sm">
                    <AcoesMes />
                </div>
                
                <div className="text-white bg-cyan-900 bg-opacity-80 p-8 rounded-xl max-w-md shadow-2xl z-10 border border-cyan-700 backdrop-blur-sm">
                    <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Projeto Legal</h1>
                    <p className="text-cyan-100 opacity-90 mb-6 text-lg">
                        Promovendo o acesso à justiça e educação jurídica para toda a comunidade. 
                        Explore nossas dicas e acompanhe as ações mensais.
                    </p>
                    <div className=" space-x-4">
                        <button 
                            onClick={() => simulateLoading('spinner')} 
                            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-lg text-white transition-all shadow-lg font-semibold cursor-pointer"
                        >
                            Loading Spinner
                        </button>
                        <button 
                            onClick={() => simulateLoading('dots')} 
                            className="px-4 py-2 bg-white text-cyan-900 hover:bg-cyan-50 rounded-lg transition-all shadow-lg font-semibold cursor-pointer"
                        >
                            Loading Dots
                        </button>
                    </div>
                </div>

                {/* Overlay to improve readability */}
                <div className="absolute inset-0 bg-black/30"></div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-cyan-950">Destaques do Projeto</h2>
                    <p className="text-gray-600 mt-2">Confira nossas produções mais recentes</p>
                </div>
                <ProjectCarousel />
            </div>

            <QuemSomos />

            <LegalTips />
        </div>
    );
}

export default Home;
