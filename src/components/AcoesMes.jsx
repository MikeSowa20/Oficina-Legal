import Calendar from 'react-calendar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { usePersistence } from '../hooks/usePersistence';

function AcoesMes(){
    const { actions } = usePersistence();
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();

    const getActionForDate = (date) => {
        return actions.find(action => action.date === date.toDateString());
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const action = getActionForDate(date);
            if (action) {
                return (
                    <div className="relative flex justify-center mt-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                );
            }
        }
        return null;
    };

    const handleDayClick = (date) => {
        const action = getActionForDate(date);
        if (action) {
            navigate('/detail/acao/' + action.id);
        }
    };

    return(
        <div className="text-center text-white bg-cyan-900 bg-opacity-80 p-6 rounded-xl shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4 border-b border-cyan-700 pb-2">Calendário de Ações</h2>
            
            <div className="calendar-container text-gray-800 rounded-lg overflow-hidden bg-white p-2">
                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    tileContent={tileContent}
                    onClickDay={handleDayClick}
                    className="border-none shadow-none"
                />
            </div>

            <div className="mt-4 min-h-[60px] p-3 bg-cyan-800 rounded-lg border border-cyan-600">
                {getActionForDate(value) ? (
                    <div className="animate-fade-in">
                        <p className="font-bold text-cyan-300">Ação agendada:</p>
                        <p className="text-sm">{getActionForDate(value).title}</p>
                        <p className="text-xs text-cyan-200 italic mt-1">Clique no dia para detalhes</p>
                    </div>
                ) : (
                    <p className="text-sm text-cyan-200">Selecione um dia com ponto azul para ver as ações do mês.</p>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .react-calendar {
                    width: 100% !important;
                    background: white !important;
                    border: none !important;
                    font-family: inherit !important;
                }
                .react-calendar__tile--active {
                    background: #164e63 !important; /* cyan-900 */
                    color: white !important;
                }
                .react-calendar__tile--now {
                    background: #ecfeff !important; /* cyan-50 */
                }
                .react-calendar__navigation button:enabled:hover,
                .react-calendar__navigation button:enabled:focus {
                    background-color: #f0fdfa !important;
                }
                .react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus {
                    background-color: #f0fdfa !important;
                }
            ` }} />
        </div>
    )
}

export default AcoesMes
