import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { UMLMethod, UMLParameter } from '../../types/uml';
import { VisibilityIcon } from './VisibilityIcon';

interface MethodListProps {
  methods: UMLMethod[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<UMLMethod>) => void;
  onAddParameter: (methodId: string) => void;
  onDeleteParameter: (methodId: string, parameterId: string) => void;
  onUpdateParameter: (methodId: string, parameterId: string, updates: Partial<UMLParameter>) => void;
}

export function MethodList({
  methods,
  onAdd,
  onDelete,
  onUpdate,
  onAddParameter,
  onDeleteParameter,
  onUpdateParameter,
}: MethodListProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Methods</h3>
        <button onClick={onAdd} className="p-1 hover:text-blue-500" title="Add method">
          <Plus size={16} />
        </button>
      </div>
      {methods.map((method) => (
        <div key={method.id} className="mb-4 border rounded p-2">
          <div className="flex items-center gap-2 text-sm mb-2">
            <select
              value={method.visibility}
              onChange={(e) => onUpdate(method.id, { visibility: e.target.value as any })}
              className="p-1 border rounded"
            >
              <option value="public">+</option>
              <option value="private">-</option>
              <option value="protected">#</option>
            </select>
            <input
              value={method.name}
              onChange={(e) => onUpdate(method.id, { name: e.target.value })}
              className="flex-1 p-1 border rounded"
              placeholder="name"
            />
            <input
              value={method.returnType}
              onChange={(e) => onUpdate(method.id, { returnType: e.target.value })}
              className="flex-1 p-1 border rounded"
              placeholder="return type"
            />
            <button onClick={() => onDelete(method.id)} className="p-1 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Parameters</span>
              <button
                onClick={() => onAddParameter(method.id)}
                className="p-1 hover:text-blue-500"
                title="Add parameter"
              >
                <Plus size={14} />
              </button>
            </div>
            {method.parameters.map((param) => (
              <div key={param.id} className="flex items-center gap-2 text-sm mb-1">
                <input
                  value={param.name}
                  onChange={(e) =>
                    onUpdateParameter(method.id, param.id, { name: e.target.value })
                  }
                  className="flex-1 p-1 border rounded"
                  placeholder="name"
                />
                <input
                  value={param.type}
                  onChange={(e) =>
                    onUpdateParameter(method.id, param.id, { type: e.target.value })
                  }
                  className="flex-1 p-1 border rounded"
                  placeholder="type"
                />
                <button
                  onClick={() => onDeleteParameter(method.id, param.id)}
                  className="p-1 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}