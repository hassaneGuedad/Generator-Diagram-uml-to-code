import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { UMLAttribute } from '../../types/uml';
import { VisibilityIcon } from './VisibilityIcon';

interface AttributeListProps {
  attributes: UMLAttribute[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<UMLAttribute>) => void;
}

export function AttributeList({ attributes, onAdd, onDelete, onUpdate }: AttributeListProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Attributes</h3>
        <button
          onClick={onAdd}
          className="p-1 hover:text-blue-500"
          title="Add attribute"
        >
          <Plus size={16} />
        </button>
      </div>
      {attributes.map((attr) => (
        <div key={attr.id} className="flex items-center gap-2 text-sm mb-2">
          <select
            value={attr.visibility}
            onChange={(e) => onUpdate(attr.id, { visibility: e.target.value as any })}
            className="p-1 border rounded"
          >
            <option value="public">+</option>
            <option value="private">-</option>
            <option value="protected">#</option>
          </select>
          <input
            value={attr.name}
            onChange={(e) => onUpdate(attr.id, { name: e.target.value })}
            className="flex-1 p-1 border rounded"
            placeholder="name"
          />
          <input
            value={attr.type}
            onChange={(e) => onUpdate(attr.id, { type: e.target.value })}
            className="flex-1 p-1 border rounded"
            placeholder="type"
          />
          <button
            onClick={() => onDelete(attr.id)}
            className="p-1 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}











