import { create } from 'zustand';
import type { UMLClass, UMLRelation } from '../types/uml';

interface DiagramState {
  classes: UMLClass[];
  relations: UMLRelation[];
  addClass: (umlClass: UMLClass) => void;
  removeClass: (id: string) => void;
  updateClass: (id: string, updates: Partial<UMLClass>) => void;
  addRelation: (relation: UMLRelation) => void;
  removeRelation: (id: string) => void;
  updateRelation: (id: string, updates: Partial<UMLRelation>) => void; // Nouvelle méthode
}

// Création du store Zustand pour gérer l'état du diagramme
export const useDiagramStore = create<DiagramState>((set) => ({
  classes: [],
  relations: [],

    // Méthode pour ajouter une classe
  addClass: (umlClass) =>
    set((state) => ({ classes: [...state.classes, umlClass] })),
  
  // Méthode pour supprimer une classe
  removeClass: (id) =>
    set((state) => ({
      classes: state.classes.filter((c) => c.id !== id),
      relations: state.relations.filter(
        (r) => r.source !== id && r.target !== id
      ),
    })),
  updateClass: (id, updates) =>
    set((state) => ({
      classes: state.classes.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  addRelation: (relation) =>
    set((state) => ({ relations: [...state.relations, relation] })),
  removeRelation: (id) =>
    set((state) => ({
      relations: state.relations.filter((r) => r.id !== id),
    })),
  updateRelation: (id, updates) =>
    set((state) => ({
      relations: state.relations.map((relation) =>
        relation.id === id ? { ...relation, ...updates } : relation
      ),
    })), // Méthode pour mettre à jour une relation
}));
