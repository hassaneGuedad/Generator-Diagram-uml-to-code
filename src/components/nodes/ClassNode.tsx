import React from 'react';
import { Handle, Position } from 'reactflow';
import { Edit2, Trash2 } from 'lucide-react';
import type { UMLClass, UMLAttribute, UMLMethod, UMLParameter } from '../../types/uml';
import { useDiagramStore } from '../../store/diagramStore';
import { AttributeList } from './AttributeList';
import { MethodList } from './MethodList';

interface ClassNodeProps {
  id: string;
  data: UMLClass['data'];
}

export function ClassNode({ id, data }: ClassNodeProps) {
  const updateClass = useDiagramStore((state) => state.updateClass);
  const removeClass = useDiagramStore((state) => state.removeClass);

  const handleAddAttribute = () => {
    const newAttribute: UMLAttribute = {
      id: `attr-${Date.now()}`,
      name: 'newAttribute',
      type: 'string',
      visibility: 'private',
    };
    updateClass(id, {
      data: {
        ...data,
        attributes: [...data.attributes, newAttribute],
      },
    });
  };

  const handleDeleteAttribute = (attributeId: string) => {
    updateClass(id, {
      data: {
        ...data,
        attributes: data.attributes.filter((attr) => attr.id !== attributeId),
      },
    });
  };

  const handleUpdateAttribute = (attributeId: string, updates: Partial<UMLAttribute>) => {
    updateClass(id, {
      data: {
        ...data,
        attributes: data.attributes.map((attr) =>
          attr.id === attributeId ? { ...attr, ...updates } : attr
        ),
      },
    });
  };

  const handleAddMethod = () => {
    const newMethod: UMLMethod = {
      id: `method-${Date.now()}`,
      name: 'newMethod',
      returnType: 'void',
      parameters: [],
      visibility: 'public',
    };
    updateClass(id, {
      data: {
        ...data,
        methods: [...data.methods, newMethod],
      },
    });
  };

  const handleDeleteMethod = (methodId: string) => {
    updateClass(id, {
      data: {
        ...data,
        methods: data.methods.filter((method) => method.id !== methodId),
      },
    });
  };

  const handleUpdateMethod = (methodId: string, updates: Partial<UMLMethod>) => {
    updateClass(id, {
      data: {
        ...data,
        methods: data.methods.map((method) =>
          method.id === methodId ? { ...method, ...updates } : method
        ),
      },
    });
  };

  const handleAddParameter = (methodId: string) => {
    const newParameter: UMLParameter = {
      id: `param-${Date.now()}`,
      name: 'newParam',
      type: 'string',
    };
    updateClass(id, {
      data: {
        ...data,
        methods: data.methods.map((method) =>
          method.id === methodId
            ? { ...method, parameters: [...method.parameters, newParameter] }
            : method
        ),
      },
    });
  };

  const handleDeleteParameter = (methodId: string, parameterId: string) => {
    updateClass(id, {
      data: {
        ...data,
        methods: data.methods.map((method) =>
          method.id === methodId
            ? {
                ...method,
                parameters: method.parameters.filter((param) => param.id !== parameterId),
              }
            : method
        ),
      },
    });
  };

  const handleUpdateParameter = (
    methodId: string,
    parameterId: string,
    updates: Partial<UMLParameter>
  ) => {
    updateClass(id, {
      data: {
        ...data,
        methods: data.methods.map((method) =>
          method.id === methodId
            ? {
                ...method,
                parameters: method.parameters.map((param) =>
                  param.id === parameterId ? { ...param, ...updates } : param
                ),
              }
            : method
        ),
      },
    });
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg min-w-[300px]">
      <Handle type="target" position={Position.Top} />
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <input
            value={data.name}
            onChange={(e) =>
              updateClass(id, {
                data: { ...data, name: e.target.value },
              })
            }
            className="font-bold text-lg bg-transparent border-none focus:outline-none"
          />
          <button
            onClick={() => removeClass(id)}
            className="p-1 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <AttributeList
        attributes={data.attributes}
        onAdd={handleAddAttribute}
        onDelete={handleDeleteAttribute}
        onUpdate={handleUpdateAttribute}
      />
      <MethodList
        methods={data.methods}
        onAdd={handleAddMethod}
        onDelete={handleDeleteMethod}
        onUpdate={handleUpdateMethod}
        onAddParameter={handleAddParameter}
        onDeleteParameter={handleDeleteParameter}
        onUpdateParameter={handleUpdateParameter}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}