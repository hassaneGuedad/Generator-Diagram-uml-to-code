import type { UMLClass, UMLRelation } from '../../types/uml';

// Fonction pour générer du code Java à partir des classes UML et des relations UML

export function generateJavaCode(
  classes: UMLClass[],
  relations: UMLRelation[]
): string {
  return classes
    .map((c) => {
            
      // Recherche de la relation d'héritage pour la classe courante

      const inheritance = relations.find(
        (r) => r.type === 'inheritance' && r.source === c.id
      );

            // Détermine la classe parente (si elle existe) pour l'héritage
      
      const extendsClass = inheritance
        ? ` extends ${classes.find((pc) => pc.id === inheritance.target)?.data.name}`
        : '';

      const attributes = c.data.attributes
        .map((attr) => {
          const visibility = attr.visibility === 'private' ? 'private' :
                           attr.visibility === 'protected' ? 'protected' : 'public';
          return `    ${visibility} ${attr.type} ${attr.name};`;
        })
        .join('\n');

      const methods = c.data.methods
        .map((method) => {
          const visibility = method.visibility === 'private' ? 'private' :
                           method.visibility === 'protected' ? 'protected' : 'public';
          const parameters = method.parameters
            .map((p) => `${p.type} ${p.name}`)
            .join(', ');
            
          return `    ${visibility} ${method.returnType} ${method.name}(${parameters}) {
        // TODO: Implement ${method.name}
        ${method.returnType !== 'void' ? `return ${getDefaultReturnValue(method.returnType)};` : ''}
    }`;
        })
        .join('\n\n');

      return `/**
 * ${c.data.name} class
 */
public class ${c.data.name}${extendsClass} {
    // Attributes
${attributes}

    // Constructor
    public ${c.data.name}() {
        // TODO: Initialize attributes
    }

    // Methods
${methods}
}`;
    })
    .join('\n\n');
}

function getDefaultReturnValue(type: string): string {
  switch (type.toLowerCase()) {
    case 'int':
    case 'byte':
    case 'short':
    case 'long':
      return '0';
    case 'float':
    case 'double':
      return '0.0';
    case 'boolean':
      return 'false';
    case 'char':
      return "' '";
    case 'string':
      return '""';
    default:
      return 'null';
  }
}