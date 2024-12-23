import React, { useState } from 'react';
import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer } from 'reactflow';
import { UMLRelation } from '../../types/uml';

export function RelationEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<UMLRelation>) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Local state for cardinality editing
  const [sourceCardinality, setSourceCardinality] = useState(data?.sourceCardinality || '1');
  const [targetCardinality, setTargetCardinality] = useState(data?.targetCardinality || '*');

    // Gestionnaire de changement pour la cardinalité de la source

  const handleSourceCardinalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceCardinality(e.target.value);
    if (data?.onCardinalityChange) {
      data.onCardinalityChange(id, 'source', e.target.value);
    }
  };

  const handleTargetCardinalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetCardinality(e.target.value);
    if (data?.onCardinalityChange) {
      data.onCardinalityChange(id, 'target', e.target.value);
    }
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={2}
        stroke="#333"
        fill="none"
        markerEnd={data?.type === 'inheritance' ? 'url(#inheritance-arrow)' : undefined}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${sourceX + 50}px,${sourceY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <select
            value={sourceCardinality}
            onChange={handleSourceCardinalityChange}
            style={{ fontSize: '12px', padding: '2px', border: '1px solid #ccc' }}
          >
            <option value="0..1">0..1</option>
            <option value="1">1</option>
            <option value="1..*">1..*</option>
            <option value="0..*">0..*</option>
          </select>
        </div>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${targetX - 50}px,${targetY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <select
            value={targetCardinality}
            onChange={handleTargetCardinalityChange}
            style={{ fontSize: '12px', padding: '2px', border: '1px solid #ccc' }}
          >
            <option value="0..1">0..1</option>
            <option value="1">1</option>
            <option value="1..*">1..*</option>
            <option value="0..*">0..*</option>
          </select>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
