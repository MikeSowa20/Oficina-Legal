import React from 'react';

const RichContentEditor = ({ blocks = [], setBlocks }) => {
  const addBlock = (type) => {
    const newBlock = { type };
    if (type === 'text') newBlock.content = '';
    if (type === 'heading') newBlock.content = '';
    if (type === 'image') { newBlock.url = ''; newBlock.caption = ''; }
    if (type === 'video') newBlock.url = '';
    if (type === 'link') { newBlock.url = ''; newBlock.label = ''; }
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (index, updates) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setBlocks(newBlocks);
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleFileUpload = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBlock(index, { url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={index} className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg relative group">
            <div className="absolute -right-2 -top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                type="button"
                onClick={() => moveBlock(index, 'up')} 
                className="bg-white p-1 rounded border shadow hover:bg-gray-100 cursor-pointer text-gray-800"
                title="Mover para cima"
              >
                ↑
              </button>
              <button 
                type="button"
                onClick={() => moveBlock(index, 'down')} 
                className="bg-white p-1 rounded border shadow hover:bg-gray-100 cursor-pointer text-gray-800"
                title="Mover para baixo"
              >
                ↓
              </button>
              <button 
                type="button"
                onClick={() => removeBlock(index)} 
                className="bg-red-500 text-white p-1 rounded border shadow hover:bg-red-600 cursor-pointer"
                title="Remover bloco"
              >
                ×
              </button>
            </div>

            {block.type === 'text' && (
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                placeholder="Digite seu texto aqui... (Use ** para negrito)"
                className="w-full p-2 border rounded resize-y min-h-[100px] text-gray-800"
              />
            )}

            {block.type === 'heading' && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(index, { content: e.target.value })}
                placeholder="Título da Seção"
                className="w-full p-2 border rounded font-bold text-lg text-cyan-900"
              />
            )}

            {block.type === 'image' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={block.url}
                    onChange={(e) => updateBlock(index, { url: e.target.value })}
                    placeholder="URL da Imagem ou faça upload"
                    className="flex-1 p-2 border rounded text-gray-800"
                  />
                  <label className="bg-cyan-700 text-white px-3 py-2 rounded cursor-pointer hover:bg-cyan-800 text-sm font-bold flex items-center">
                    Upload
                    <input type="file" accept="image/*" onChange={handleFileUpload(index)} className="hidden" />
                  </label>
                </div>
                {block.url && (
                  <div className="relative inline-block">
                    {block.url.startsWith('data:image') || block.url.includes('http') ? (
                       <img src={block.url} alt="Preview" className="max-h-32 rounded border" />
                    ) : (
                       <div className="p-2 border rounded bg-gray-100 text-xs text-gray-500">URL da imagem detectada</div>
                    )}
                    <button 
                      type="button"
                      onClick={() => updateBlock(index, { url: '' })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  value={block.caption}
                  onChange={(e) => updateBlock(index, { caption: e.target.value })}
                  placeholder="Legenda (opcional)"
                  className="w-full p-2 border rounded text-sm text-gray-600"
                />
              </div>
            )}

            {block.type === 'video' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={block.url}
                    onChange={(e) => updateBlock(index, { url: e.target.value })}
                    placeholder="URL do Vídeo (YouTube/Vimeo) ou faça upload"
                    className="flex-1 p-2 border rounded text-gray-800"
                  />
                  <label className="bg-cyan-700 text-white px-3 py-2 rounded cursor-pointer hover:bg-cyan-800 text-sm font-bold flex items-center">
                    Upload
                    <input type="file" accept="video/*" onChange={handleFileUpload(index)} className="hidden" />
                  </label>
                </div>
                {block.url && (
                  <div className="relative inline-block">
                    {block.url.startsWith('data:video') ? (
                       <video src={block.url} className="max-h-32 rounded border" controls />
                    ) : (
                       <div className="p-2 border rounded bg-gray-100 text-xs text-gray-500">URL do vídeo detectada: {block.url}</div>
                    )}
                    <button 
                      type="button"
                      onClick={() => updateBlock(index, { url: '' })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}

            {block.type === 'link' && (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={block.label}
                  onChange={(e) => updateBlock(index, { label: e.target.value })}
                  placeholder="Texto do Botão"
                  className="flex-1 p-2 border rounded text-gray-800"
                />
                <input
                  type="text"
                  value={block.url}
                  onChange={(e) => updateBlock(index, { url: e.target.value })}
                  placeholder="URL do Link"
                  className="flex-[2] p-2 border rounded text-gray-800"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <button type="button" onClick={() => addBlock('text')} className="bg-white border-2 border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-50 text-sm font-bold cursor-pointer">+ Texto</button>
        <button type="button" onClick={() => addBlock('heading')} className="bg-white border-2 border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-50 text-sm font-bold cursor-pointer">+ Título</button>
        <button type="button" onClick={() => addBlock('image')} className="bg-white border-2 border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-50 text-sm font-bold cursor-pointer">+ Imagem</button>
        <button type="button" onClick={() => addBlock('video')} className="bg-white border-2 border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-50 text-sm font-bold cursor-pointer">+ Vídeo</button>
        <button type="button" onClick={() => addBlock('link')} className="bg-white border-2 border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-50 text-sm font-bold cursor-pointer">+ Link</button>
      </div>
    </div>
  );
};

export default RichContentEditor;
