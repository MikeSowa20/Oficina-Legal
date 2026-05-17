import { useState } from 'react';
import { usePersistence } from '../hooks/usePersistence';
import Modal from '../components/Modal';
import RichContentEditor from '../components/RichContentEditor';

function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const { 
        actions, setActions, 
        tips, setTips, 
        articles, setArticles, 
        folders, setFolders 
    } = usePersistence();

    const [activeTab, setActiveTab] = useState('articles');
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple password for now
            setIsLoggedIn(true);
        } else {
            alert('Senha incorreta');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cyan-950 px-4 py-20">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                    <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">Acesso Administrativo</h2>
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-800"
                    />
                    <button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer">
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    const openAddModal = (type) => {
        let newItem = { id: Date.now(), title: '', type };
        if (type === 'articles' || type === 'folders' || type === 'actions') {
            newItem.blocks = [];
            if (type === 'actions') {
                newItem.date = new Date().toISOString().split('T')[0];
            }
        } else if (type === 'tips') {
            newItem.icon = '💡';
            newItem.content = '';
        }
        setEditingItem(newItem);
        setIsEditModalOpen(true);
    };

    const openEditModal = (type, item) => {
        let itemToEdit = { ...item, type };
        
        // Data migration/compatibility
        if ((type === 'articles' || type === 'actions') && !itemToEdit.blocks) {
            itemToEdit.blocks = [{ type: 'text', content: itemToEdit.content || itemToEdit.fullDesc || itemToEdit.shortDesc || '' }];
        }
        if (type === 'folders' && !itemToEdit.blocks) {
            itemToEdit.blocks = [{ type: 'image', url: itemToEdit.imageUrl || '', caption: '' }];
        }

        setEditingItem(itemToEdit);
        setIsEditModalOpen(true);
    };

    const saveItem = () => {
        if (!editingItem.title) {
            alert('Por favor, insira um título.');
            return;
        }

        const type = editingItem.type;
        const list = type === 'articles' ? articles : 
                     type === 'folders' ? folders : 
                     type === 'actions' ? actions : tips;
        const setList = type === 'articles' ? setArticles : 
                        type === 'folders' ? setFolders : 
                        type === 'actions' ? setActions : setTips;

        if (list.find(i => i.id === editingItem.id)) {
            setList(list.map(i => i.id === editingItem.id ? editingItem : i));
        } else {
            setList([...list, editingItem]);
        }

        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    const deleteItem = (type, id) => {
        if (!confirm('Tem certeza?')) return;
        if (type === 'articles') setArticles(articles.filter(item => item.id !== id));
        else if (type === 'folders') setFolders(folders.filter(item => item.id !== id));
        else if (type === 'actions') setActions(actions.filter(item => item.id !== id));
        else if (type === 'tips') setTips(tips.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-cyan-900 p-6 text-white flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Painel Administrativo</h1>
                    <button onClick={() => setIsLoggedIn(false)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer">Sair</button>
                </div>

                <div className="flex border-b overflow-x-auto">
                    {['articles', 'folders', 'actions', 'tips'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-bold capitalize whitespace-nowrap cursor-pointer ${activeTab === tab ? 'text-cyan-700 border-b-2 border-cyan-700' : 'text-gray-500 hover:text-cyan-600'}`}
                        >
                            {tab === 'articles' ? 'Artigos' : tab === 'folders' ? 'Folders' : tab === 'actions' ? 'Calendário' : 'Dicas'}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    <button 
                        onClick={() => openAddModal(activeTab)}
                        className="mb-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold transition-colors cursor-pointer"
                    >
                        + Adicionar {activeTab === 'articles' ? 'Artigo' : activeTab === 'folders' ? 'Folder' : activeTab === 'actions' ? 'Ação' : 'Dica'}
                    </button>

                    <div className="grid gap-4">
                        {(activeTab === 'articles' ? articles : activeTab === 'folders' ? folders : activeTab === 'actions' ? actions : tips).length === 0 && (
                            <p className="text-gray-500 text-center py-10">Nenhum item cadastrado.</p>
                        )}
                        {(activeTab === 'articles' ? articles : activeTab === 'folders' ? folders : activeTab === 'actions' ? actions : tips).map(item => (
                            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg">
                                <div className="flex-1 mr-4">
                                    <h3 className="font-bold text-cyan-900">{item.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">{item.content || item.shortDesc || item.imageUrl || (item.blocks && item.blocks[0]?.content) || 'Conteúdo rico'}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => openEditModal(activeTab, item)}
                                        className="text-cyan-600 hover:text-cyan-800 font-bold cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => deleteItem(activeTab, item.id)}
                                        className="text-red-600 hover:text-red-800 font-bold cursor-pointer"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                title={editingItem?.id ? 'Editar Item' : 'Adicionar Item'}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Título</label>
                        <input 
                            type="text"
                            value={editingItem?.title || ''}
                            onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            className="w-full p-2 border rounded text-gray-800"
                            placeholder="Título"
                        />
                    </div>

                    {(editingItem?.type === 'articles' || editingItem?.type === 'folders' || editingItem?.type === 'actions') ? (
                        <div className="space-y-4">
                            {editingItem?.type === 'actions' && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Data</label>
                                    <input 
                                        type="date"
                                        value={editingItem?.date || ''}
                                        onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                                        className="w-full p-2 border rounded text-gray-800"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Conteúdo Rico</label>
                                <RichContentEditor 
                                    blocks={editingItem?.blocks || []}
                                    setBlocks={(blocks) => setEditingItem({...editingItem, blocks})}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Ícone (Emoji)</label>
                                <input 
                                    type="text"
                                    value={editingItem?.icon || ''}
                                    onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
                                    className="w-full p-2 border rounded text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Conteúdo</label>
                                <textarea 
                                    value={editingItem?.content || ''}
                                    onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                                    className="w-full p-2 border rounded text-gray-800 min-h-[100px]"
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-6 flex justify-end gap-3">
                        <button 
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-gray-600 font-bold hover:text-gray-800 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={saveItem}
                            className="px-6 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg font-bold transition-colors cursor-pointer"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Admin;
