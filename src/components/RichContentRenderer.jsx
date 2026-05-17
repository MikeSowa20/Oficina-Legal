import React from 'react';

const RichContentRenderer = ({ blocks = [] }) => {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <p key={index} className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {block.content.split('**').map((part, i) => 
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                )}
              </p>
            );
          case 'heading':
            return (
              <h2 key={index} className="text-2xl font-bold text-cyan-900 mt-8 mb-4">
                {block.content}
              </h2>
            );
          case 'image':
            return (
              <figure key={index} className="my-6">
                <img src={block.url} alt={block.caption || ''} className="w-full rounded-lg shadow-md" />
                {block.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case 'video':
            // Check if it's a data URL (local upload)
            if (block.url && block.url.startsWith('data:video')) {
              return (
                <div key={index} className="my-6">
                  <video src={block.url} controls className="w-full rounded-lg shadow-md" />
                </div>
              );
            }
            
            // Simple YouTube/Vimeo embed logic
            let embedUrl = block.url || '';
            if (embedUrl.includes('youtube.com/watch?v=')) {
              embedUrl = embedUrl.replace('watch?v=', 'embed/');
            } else if (embedUrl.includes('youtu.be/')) {
              embedUrl = embedUrl.replace('youtu.be/', 'https://www.youtube.com/embed/');
            }
            
            return (
              <div key={index} className="aspect-video my-6">
                <iframe
                  className="w-full h-full rounded-lg shadow-md"
                  src={embedUrl}
                  title="Video block"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          case 'link':
            return (
              <div key={index} className="my-4">
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  {block.label || 'Saiba mais'}
                </a>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default RichContentRenderer;
