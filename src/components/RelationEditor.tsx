import React from 'react';
import { UMLRelation, Cardinality } from '../types/uml';

interface RelationEditorProps {
  relation: UMLRelation;
  onUpdate: (updates: Partial<UMLRelation>) => void;
}

export function RelationEditor({ relation, onUpdate }: RelationEditorProps) {
  const cardinalityOptions: Cardinality[] = ['0..1', '1', '0..*', '1..*', '*'];

  return (
    <div className="p-2 bg-white rounded shadow-lg">
      <div className="flex gap-2 mb-2">
        <select
          value={relation.type}
          onChange={(e) => onUpdate({ type: e.target.value as UMLRelation['type'] })}
          className="p-1 border rounded"
        >
          <option value="association">Association</option>
          <option value="inheritance">Inheritance</option>
          <option value="composition">Composition</option>
          <option value="aggregation">Aggregation</option>
        </select>
      </div>
      <div className="flex gap-2">
        <select
          value={relation.sourceCardinality}
          onChange={(e) => onUpdate({ sourceCardinality: e.target.value })}
          className="p-1 border rounded"
        >
          {cardinalityOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={relation.targetCardinality}
          onChange={(e) => onUpdate({ targetCardinality: e.target.value })}
          className="p-1 border rounded"
        >
          {cardinalityOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
