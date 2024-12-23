import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Panel, Connection, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Code, Save } from 'lucide-react'; // Import des icônes
import { useDiagramStore } from '../store/diagramStore';
import { ClassNode } from './nodes/ClassNode';
import { RelationEdge } from './edges/RelationEdge';
import { CodeGenerator } from './CodeGenerator';
import html2canvas from 'html2canvas'; // Import de html2canvas
import type { UMLRelation } from '../types/uml';

// Définition des types de noeuds et d'arêtes
const nodeTypes = {
  classNode: ClassNode,
};

const edgeTypes = {
  relation: RelationEdge,
};

// Fonction principale DiagramEditor
export function DiagramEditor() {
  const { classes, relations, addClass, addRelation, updateClass, updateRelation } = useDiagramStore();
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatedCode, setGeneratedCode] = useState({
    java: '',
    php: '',
    python: '',
  });
  const [selectedRelationType, setSelectedRelationType] = useState<'association' | 'inheritance' | 'composition' | 'aggregation' | null>(null);

  // Ajouter une nouvelle classe
  const handleAddClass = () => {
    const position = {
      x: Math.random() * 800,
      y: Math.random() * 600,
    };

    addClass({
      id: `class-${Date.now()}`,
      position,
      data: {
        name: 'NewClass',
        attributes: [],
        methods: [],
      },
    });
  };

  // Connecter deux noeuds avec une relation
  const handleConnect = (connection: Connection) => {
    if (!selectedRelationType) {
      alert("Please select a relation type first.");
      return;
    }

    if (connection.source && connection.target) {
      const newRelation: UMLRelation = {
        id: `relation-${Date.now()}`,
        source: connection.source,
        target: connection.target,
        type: selectedRelationType,
        sourceCardinality: '1',
        targetCardinality: '*',
        onCardinalityChange: (sourceCardinality: string, targetCardinality: string) => {
          console.log(`Cardinality changed: ${sourceCardinality} to ${targetCardinality}`);
          updateRelation(newRelation.id, { sourceCardinality, targetCardinality });
        },
      };
      addRelation(newRelation);
    }
  };

  // Gérer le déplacement des noeuds
  const handleNodeDragStop = (_: any, node: Node) => {
    updateClass(node.id, { position: node.position });
  };

  // Générer le code en Java, PHP, et Python
  const handleGenerateCode = () => {
    const javaCode = generateJavaCode();
    const phpCode = generatePHPCode();
    const pythonCode = generatePythonCode();

    setGeneratedCode({ java: javaCode, php: phpCode, python: pythonCode });
    setShowGenerator(true);
  };

  // Générer le code Java
  const generateJavaCode = () => {
    let code = '';
    classes.forEach((cls) => {
      code += `public class ${cls.data.name} {\n`;
      cls.data.attributes.forEach((attr) => {
        code += `    private ${attr.type} ${attr.name};\n`;
      });
      cls.data.methods.forEach((method) => {
        code += `    public ${method.returnType} ${method.name}() {\n`;
        code += `        // method implementation\n`;
        code += `    }\n`;
      });
      code += `}\n\n`;
    });
    return code;
  };

  // Générer le code PHP
  const generatePHPCode = () => {
    let code = '';
    classes.forEach((cls) => {
      code += `class ${cls.data.name} {\n`;
      cls.data.attributes.forEach((attr) => {
        code += `    private $${attr.name};\n`;
      });
      cls.data.methods.forEach((method) => {
        code += `    public function ${method.name}() {\n`;
        code += `        // method implementation\n`;
        code += `    }\n`;
      });
      code += `}\n\n`;
    });
    return code;
  };

  // Générer le code Python
  const generatePythonCode = () => {
    let code = '';
    classes.forEach((cls) => {
      code += `class ${cls.data.name}:\n`;
      cls.data.attributes.forEach((attr) => {
        code += `    def __init__(self, ${attr.name}):\n`;
        code += `        self.${attr.name} = ${attr.name}\n`;
      });
      cls.data.methods.forEach((method) => {
        code += `    def ${method.name}(self):\n`;
        code += `        # method implementation\n`;
      });
      code += `\n`;
    });
    return code;
  };

  // Sauvegarder le code généré dans des fichiers
  const handleSaveCode = () => {
    const saveFile = (content: string, fileName: string, extension: string) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.${extension}`;
      link.click();
    };

    saveFile(generatedCode.java, 'GeneratedClass', 'java');
    saveFile(generatedCode.php, 'GeneratedClass', 'php');
    saveFile(generatedCode.python, 'GeneratedClass', 'py');
  };

  // Fonction pour capturer l'écran en PNG
  const handleScreenshot = async () => {
    const diagramElement = document.querySelector('.react-flow') as HTMLElement;

    if (diagramElement) {
      try {
        const canvas = await html2canvas(diagramElement);
        const imageUrl = canvas.toDataURL('image/png');

        // Créer un lien pour télécharger l'image PNG
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'diagram.png'; // Nom du fichier
        link.click();
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={classes.map((c) => ({
          id: c.id,
          type: 'classNode',
          position: c.position,
          data: c.data,
        }))}
        edges={relations.map((r) => ({
          id: r.id,
          source: r.source,
          target: r.target,
          type: 'relation',
          data: r,
        }))}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={handleConnect}
        onNodeDragStop={handleNodeDragStop}
      >
        <Background />
        <Controls />
        <Panel position="top-right" className="flex gap-2">
          <button
            onClick={handleAddClass}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={16} /> Add Class
          </button>
          <button
            onClick={handleGenerateCode}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Code size={16} /> Generate Code
          </button>
          <button
            onClick={handleSaveCode}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            <Save size={16} /> Save Code
          </button>
          <button
            onClick={handleScreenshot}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <Save size={16} /> Capture Screenshot
          </button>
          <div className="flex items-center gap-2">
            <label className="text-white">Select Relation Type</label>
            <select
              className="bg-gray-700 text-white p-2 rounded-md"
              value={selectedRelationType || ''}
              onChange={(e) => setSelectedRelationType(e.target.value as 'association' | 'inheritance' | 'composition' | 'aggregation')}
            >
              <option value="" disabled>Select Relation Type</option>
              <option value="association">Association</option>
              <option value="inheritance">Inheritance</option>
              <option value="composition">Composition</option>
              <option value="aggregation">Aggregation</option>
            </select>
          </div>
        </Panel>
      </ReactFlow>

      {showGenerator && (
        <div className="absolute top-0 left-0 bg-white z-10 p-4 w-full h-full overflow-auto">
          <h2 className="text-xl mb-4">Generated Code</h2>
          <div className="mb-4">
            <h3 className="font-bold">Java Code</h3>
            <pre className="bg-gray-100 p-4">{generatedCode.java}</pre>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">PHP Code</h3>
            <pre className="bg-gray-100 p-4">{generatedCode.php}</pre>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Python Code</h3>
            <pre className="bg-gray-100 p-4">{generatedCode.python}</pre>
          </div>
          <button
            onClick={() => setShowGenerator(false)}
            className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
