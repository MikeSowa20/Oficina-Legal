import './Loading.css';

/**
 * Componente de Loading (Template)
 * 
 * @param {Object} props
 * @param {string} [props.message="Carregando..."] - Mensagem exibida abaixo do loader
 * @param {boolean} [props.fullScreen=true] - Se deve ocupar a tela toda (fixed) ou apenas o container pai (absolute/relative)
 * @param {string} [props.variant="spinner"] - Tipo de loader: "spinner", "dots", ou "bar"
 */
const Loading = ({ 
  message = "Carregando...", 
  fullScreen = true, 
  variant = "spinner" 
}) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm" 
    : "relative w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-transparent";

  return (
    <div className={containerClasses} aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-4">
        {variant === "spinner" && (
          <div className="loading-spinner w-12 h-12 border-4 border-cyan-200 border-t-cyan-900 rounded-full animate-spin"></div>
        )}
        
        {variant === "dots" && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-cyan-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-cyan-900 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-cyan-900 rounded-full animate-bounce"></div>
          </div>
        )}

        {variant === "bar" && (
          <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="loading-bar-progress h-full bg-cyan-900 w-full"></div>
          </div>
        )}

        {message && (
          <p className="text-cyan-900 font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
