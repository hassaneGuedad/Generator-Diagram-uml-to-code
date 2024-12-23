import type { UMLClass, UMLRelation } from '../../types/uml';

export function generatePHPCode(
  classes: UMLClass[],
  relations: UMLRelation[]
): string {
  return classes
    .map((c) => {
      // Find inheritance relation
      const inheritance = relations.find(
        (r) => r.type === 'inheritance' && r.source === c.id
      );

      // Determine the parent class (if any)
      const extendsClass = inheritance
        ? ` extends ${classes.find((pc) => pc.id === inheritance.target)?.data.name || 'BaseClass'}`
        : '';

      // Generate class definition
      return `<?php

class ${c.data.name}${extendsClass} {

    // Attributes
    ${c.data.attributes
      .map(
        (attr) =>
          `${attr.visibility} $${attr.name}; // Type: ${attr.type}`
      )
      .join('\n    ')}

    // Methods
    ${c.data.methods
      .map(
        (method) =>
          `${method.visibility} function ${method.name}(${method.parameters
            .map((p) => `$${p.name}`)
            .join(', ')}) {
        // TODO: Implement ${method.name}
    }`
      )
      .join('\n\n    ')}
}`;
    })
    .join('\n\n');
}
