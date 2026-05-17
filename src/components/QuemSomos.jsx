import React, { useEffect, useRef, useState } from 'react';

function QuemSomos() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="py-20 bg-white overflow-hidden"
        >
            <div className={`max-w-7xl mx-auto px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="inline-block px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm mb-4">
                            SOBRE NÓS
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Conheça a <span className="text-cyan-600">Oficina Legal</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            A Oficina Legal é um projeto dedicado a democratizar o conhecimento jurídico e promover a cidadania. 
                            Nossa missão é aproximar o Direito da comunidade, traduzindo termos técnicos para uma linguagem 
                            acessível e oferecendo orientações práticas para o dia a dia.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-cyan-500 shadow-sm">
                                <h4 className="font-bold text-gray-900">Missão</h4>
                                <p className="text-sm text-gray-600">Educar e conscientizar sobre direitos fundamentais.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-cyan-500 shadow-sm">
                                <h4 className="font-bold text-gray-900">Visão</h4>
                                <p className="text-sm text-gray-600">Ser referência em educação jurídica comunitária.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="aspect-video bg-cyan-900 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <span className="text-6xl mb-4 block">⚖️</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">Justiça para Todos</h3>
                                    <p className="text-cyan-100">Compromisso social e transparência.</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-100 rounded-full -z-0"></div>
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-50 rounded-full -z-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuemSomos;
