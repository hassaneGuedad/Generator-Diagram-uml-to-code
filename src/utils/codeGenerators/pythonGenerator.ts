import type { UMLClass, UMLRelation } from '../../types/uml';

export function generatePythonCode(
  classes: UMLClass[],
  relations: UMLRelation[]
): string {
  return classes
    .map((c) => {
      const inheritance = relations.find(
        (r) => r.type === 'inheritance' && r.source === c.id
      );
      
      const parentClass = inheritance
        ? classes.find((pc) => pc.id === inheritance.target)?.data.name
        : 'object';

      const attributes = c.data.attributes
        .map((attr) => `        self.${attr.name}: ${attr.type} = None`)
        .join('\n');

      const methods = c.data.methods
        .map(
          (method) => `    def ${method.name}(self${
            method.parameters.length > 0 ? ', ' : ''
          }${method.parameters
            .map((p) => `${p.name}: ${p.type}`)
            .join(', ')}) -> ${method.returnType}:
        """
        TODO: Add method documentation
        """
        pass`
        )
        .join('\n\n');

      return `class ${c.data.name}(${parentClass}):
    """
    ${c.data.name} class documentation
    """

    def __init__(self):
        """
        Initialize ${c.data.name} instance
        """
${attributes}

${methods}`;
    })
    .join('\n\n');
}