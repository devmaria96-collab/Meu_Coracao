import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Remedio {
  id: string;
  nome: string;
  dosagem: string;
}

interface RemedioContextType {
  remedios: Remedio[];
  adicionarRemedio: (remedio: Omit<Remedio, 'id'>) => void;
  editarRemedio: (id: string, remedio: Omit<Remedio, 'id'>) => void;
  excluirRemedio: (id: string) => void;
  obterRemedio: (id: string) => Remedio | undefined;
}

const RemedioContext = createContext<RemedioContextType | undefined>(undefined);

export function RemedioProvider({ children }: { children: ReactNode }) {
  const [remedios, setRemedios] = useState<Remedio[]>([
    {
      id: '1',
      nome: 'Carvedilol',
      dosagem: '6,25 mg',
    },
  ]);

  const adicionarRemedio = (remedio: Omit<Remedio, 'id'>) => {
    const novoRemedio: Remedio = {
      id: Date.now().toString(),
      ...remedio,
    };
    setRemedios([...remedios, novoRemedio]);
  };

  const editarRemedio = (id: string, remedioAtualizado: Omit<Remedio, 'id'>) => {
    setRemedios(
      remedios.map((remedio) =>
        remedio.id === id ? { ...remedio, ...remedioAtualizado } : remedio
      )
    );
  };

  const excluirRemedio = (id: string) => {
    setRemedios(remedios.filter((remedio) => remedio.id !== id));
  };

  const obterRemedio = (id: string) => {
    return remedios.find((remedio) => remedio.id === id);
  };

  return (
    <RemedioContext.Provider
      value={{ remedios, adicionarRemedio, editarRemedio, excluirRemedio, obterRemedio }}
    >
      {children}
    </RemedioContext.Provider>
  );
}

export function useRemedios() {
  const context = useContext(RemedioContext);
  if (!context) {
    throw new Error('useRemedios deve ser usado dentro de um RemedioProvider');
  }
  return context;
}
