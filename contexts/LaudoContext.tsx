import React, { createContext, useContext, useState } from 'react';

export interface Laudo {
  id: string;
  titulo: string;
  data: string; // formato: DD/MM/YYYY
  observacoes?: string;
}

interface LaudoContextType {
  laudos: Laudo[];
  addLaudo: (laudo: Laudo) => void;
  updateLaudo: (id: string, laudo: Partial<Laudo>) => void;
  deleteLaudo: (id: string) => void;
  getLaudoById: (id: string) => Laudo | undefined;
}

const LaudoContext = createContext<LaudoContextType | undefined>(undefined);

export function LaudoProvider({ children }: { children: React.ReactNode }) {
  const [laudos, setLaudos] = useState<Laudo[]>([
    {
      id: '1',
      titulo: 'Cardiopatia Congênita',
      data: '15/11/2025',
      observacoes: 'Diagnóstico confirmado por especialista',
    },
  ]);

  const addLaudo = (laudo: Laudo) => {
    setLaudos([...laudos, laudo]);
  };

  const updateLaudo = (id: string, updates: Partial<Laudo>) => {
    setLaudos(laudos.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLaudo = (id: string) => {
    setLaudos(laudos.filter((l) => l.id !== id));
  };

  const getLaudoById = (id: string) => {
    return laudos.find((l) => l.id === id);
  };

  return (
    <LaudoContext.Provider
      value={{ laudos, addLaudo, updateLaudo, deleteLaudo, getLaudoById }}
    >
      {children}
    </LaudoContext.Provider>
  );
}

export function useLaudos() {
  const context = useContext(LaudoContext);
  if (!context) {
    throw new Error('useLaudos must be used within a LaudoProvider');
  }
  return context;
}
