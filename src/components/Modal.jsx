
function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden transform transition-all">
                <div className="bg-cyan-900 p-4 flex justify-between items-center text-white">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-cyan-200 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6 text-gray-700 leading-relaxed max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
                <div className="bg-gray-50 p-4 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg transition-colors font-semibold"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
