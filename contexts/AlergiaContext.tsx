import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Alergia {
  id: string;
  nome: string;
  tipo: string;
}

interface AlergiaContextType {
  alergias: Alergia[];
  adicionarAlergia: (alergia: Omit<Alergia, 'id'>) => void;
  editarAlergia: (id: string, alergia: Omit<Alergia, 'id'>) => void;
  excluirAlergia: (id: string) => void;
  obterAlergia: (id: string) => Alergia | undefined;
}

const AlergiaContext = createContext<AlergiaContextType | undefined>(undefined);

export function AlergiaProvider({ children }: { children: ReactNode }) {
  const [alergias, setAlergias] = useState<Alergia[]>([]);

  const adicionarAlergia = (alergia: Omit<Alergia, 'id'>) => {
    const novaAlergia: Alergia = {
      id: Date.now().toString(),
      ...alergia,
    };
    setAlergias([...alergias, novaAlergia]);
  };

  const editarAlergia = (id: string, alergiaAtualizada: Omit<Alergia, 'id'>) => {
    setAlergias(
      alergias.map((alergia) =>
        alergia.id === id ? { ...alergia, ...alergiaAtualizada } : alergia
      )
    );
  };

  const excluirAlergia = (id: string) => {
    setAlergias(alergias.filter((alergia) => alergia.id !== id));
  };

  const obterAlergia = (id: string) => {
    return alergias.find((alergia) => alergia.id === id);
  };

  return (
    <AlergiaContext.Provider
      value={{ alergias, adicionarAlergia, editarAlergia, excluirAlergia, obterAlergia }}
    >
      {children}
    </AlergiaContext.Provider>
  );
}

export function useAlergias() {
  const context = useContext(AlergiaContext);
  if (!context) {
    throw new Error('useAlergias deve ser usado dentro de um AlergiaProvider');
  }
  return context;
}
