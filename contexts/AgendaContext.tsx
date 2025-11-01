import React, { createContext, useContext, useState } from 'react';

export interface Evento {
  id: string;
  titulo: string;
  medico?: string;
  data: string; // formato: DD/MM/YYYY
  horario: string; // formato: HH:MM
  local?: string;
  observacoes?: string;
}

interface AgendaContextType {
  eventos: Evento[];
  addEvento: (evento: Evento) => void;
  updateEvento: (id: string, evento: Partial<Evento>) => void;
  deleteEvento: (id: string) => void;
  getEventoById: (id: string) => Evento | undefined;
}

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

export function AgendaProvider({ children }: { children: React.ReactNode }) {
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: '1',
      titulo: 'Exame de Sangue',
      data: '01/12/2025',
      horario: '07:00',
      observacoes: '',
    },
    {
      id: '2',
      titulo: 'Consulta com Cardiologista',
      medico: 'José Barnabé',
      data: '14/01/2026',
      horario: '09:00',
      local: 'Rua das Rosas, 123 - Parque Alburquerque',
      observacoes: '',
    },
  ]);

  const addEvento = (evento: Evento) => {
    setEventos([...eventos, evento]);
  };

  const updateEvento = (id: string, updates: Partial<Evento>) => {
    setEventos(eventos.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteEvento = (id: string) => {
    setEventos(eventos.filter((e) => e.id !== id));
  };

  const getEventoById = (id: string) => {
    return eventos.find((e) => e.id === id);
  };

  return (
    <AgendaContext.Provider
      value={{ eventos, addEvento, updateEvento, deleteEvento, getEventoById }}
    >
      {children}
    </AgendaContext.Provider>
  );
}

export function useAgenda() {
  const context = useContext(AgendaContext);
  if (!context) {
    throw new Error('useAgenda must be used within a AgendaProvider');
  }
  return context;
}
