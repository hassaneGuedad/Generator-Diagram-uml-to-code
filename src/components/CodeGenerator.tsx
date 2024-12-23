import React from 'react';
import { X } from 'lucide-react';
import { useDiagramStore } from '../store/diagramStore';
import { generateJavaCode } from '../utils/codeGenerators/javaGenerator';

interface CodeGeneratorProps {
  onClose: () => void;
}

export function CodeGenerator({ onClose }: CodeGeneratorProps) {
  const { classes, relations } = useDiagramStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Generate Java Code</h2>
          <button onClick={onClose} className="p-1 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 flex-1 overflow-auto">
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{generateJavaCode(classes, relations)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
