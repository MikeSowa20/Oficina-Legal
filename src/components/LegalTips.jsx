import { useState } from 'react';
import Modal from './Modal';
import { usePersistence } from '../hooks/usePersistence';

function LegalTips() {
    const { tips } = usePersistence();
    const [selectedTip, setSelectedTip] = useState(null);

    return (
        <section className="py-12 bg-cyan-900 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-50 mb-8 text-center">Dicas sobre Direito</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {tips.map((tip, index) => (
                        <div 
                            key={index}
                            onClick={() => setSelectedTip(tip)}
                            className="bg-white p-14 rounded-xl shadow-md border-b-4 border-cyan-700 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col items-center text-center group"
                        >
                            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {tip.icon}
                            </span>
                            <h3 className="font-bold text-cyan-900 group-hover:text-cyan-700">
                                {tip.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">Clique para saber mais</p>
                        </div>
                    ))}
                </div>
            </div>

            <Modal 
                isOpen={!!selectedTip} 
                onClose={() => setSelectedTip(null)}
                title={selectedTip?.title}
            >
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-6">{selectedTip?.icon}</span>
                    <p className="text-lg text-gray-700 text-center">
                        {selectedTip?.content}
                    </p>
                    <div className="mt-8 p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                        <p className="text-sm text-cyan-800 italic">
                            Nota: Esta é uma informação genérica. Para casos específicos, consulte sempre um advogado ou a Defensoria Pública.
                        </p>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default LegalTips;
