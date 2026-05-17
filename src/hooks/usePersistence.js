import { useState, useEffect } from 'react';

const DEFAULT_ACTIONS = [
    {
        id: 1,
        date: new Date(2026, 4, 15).toDateString(),
        title: "Palestra: Direitos da Mulher",
        shortDesc: "Discussão sobre Lei Maria da Penha.",
        fullDesc: "Uma palestra detalhada sobre os avanços da Lei Maria da Penha, como identificar abusos e quais os canais oficiais para denúncia e proteção em nossa região."
    },
    {
        id: 2,
        date: new Date(2026, 4, 22).toDateString(),
        title: "Mutirão de Documentação",
        shortDesc: "Auxílio para emissão de RG e CPF.",
        fullDesc: "Evento comunitário para auxiliar cidadãos na regularização de documentos básicos. Estaremos com uma equipe pronta para orientar sobre taxas e agendamentos nos órgãos competentes."
    },
    {
        id: 3,
        date: new Date(2026, 4, 28).toDateString(),
        title: "Workshop: Direito do Consumidor",
        shortDesc: "Dicas sobre compras online e trocas.",
        fullDesc: "Workshop focado em segurança digital e direitos básicos do consumidor ao realizar compras em e-commerce, incluindo prazos de arrependimento e garantia legal."
    }
];

const DEFAULT_TIPS = [
    {
        id: 1,
        title: "Direitos das Mulheres",
        icon: "⚖️",
        content: "Informações sobre a Lei Maria da Penha, direitos trabalhistas gestacionais e proteção contra assédio. A legislação brasileira evoluiu para garantir redes de apoio e medidas protetivas eficazes."
    },
    {
        id: 2,
        title: "Mudança de Nome",
        icon: "🆔",
        content: "Procedimentos para retificação de prenome e gênero no registro civil. Atualmente, o processo pode ser feito diretamente no cartório em diversos casos, sem necessidade de processo judicial."
    },
    {
        id: 3,
        title: "Direito do Consumidor",
        icon: "🛍️",
        content: "Conheça seus direitos sobre trocas, garantias, propaganda enganosa e cobranças indevidas. O Código de Defesa do Consumidor é sua principal ferramenta de proteção nas relações de compra."
    }
];

export function usePersistence() {
    const [actions, setActions] = useState(() => {
        const saved = localStorage.getItem('monthlyActions');
        return saved ? JSON.parse(saved) : DEFAULT_ACTIONS;
    });

    const [tips, setTips] = useState(() => {
        const saved = localStorage.getItem('legalTips');
        return saved ? JSON.parse(saved) : DEFAULT_TIPS;
    });

    const [articles, setArticles] = useState(() => {
        const saved = localStorage.getItem('articles');
        return saved ? JSON.parse(saved) : [];
    });

    const [folders, setFolders] = useState(() => {
        const saved = localStorage.getItem('folders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('monthlyActions', JSON.stringify(actions));
    }, [actions]);

    useEffect(() => {
        localStorage.setItem('legalTips', JSON.stringify(tips));
    }, [tips]);

    useEffect(() => {
        localStorage.setItem('articles', JSON.stringify(articles));
    }, [articles]);

    useEffect(() => {
        localStorage.setItem('folders', JSON.stringify(folders));
    }, [folders]);

    return {
        actions, setActions,
        tips, setTips,
        articles, setArticles,
        folders, setFolders
    };
}
