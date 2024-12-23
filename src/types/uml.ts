export interface UMLClass {
  id: string;
  position: { x: number; y: number };
  data: {
    name: string;
    attributes: UMLAttribute[];
    methods: UMLMethod[];
  };
}

export interface UMLAttribute {
  id: string;
  name: string;
  type: string;
  visibility: 'public' | 'private' | 'protected';
}

export interface UMLMethod {
  id: string;
  name: string;
  returnType: string;
  parameters: UMLParameter[];
  visibility: 'public' | 'private' | 'protected';
}

export interface UMLParameter {
  id: string;
  name: string;
  type: string;
}

export interface UMLRelation {
  onCardinalityChange(id: string, arg1: string, value: string): unknown;
  id: string;
  source: string;
  target: string;
  type: 'inheritance' | 'composition' | 'aggregation' | 'association';
  sourceCardinality: string;
  targetCardinality: string;
  label?: string;
}

export type Cardinality = '0..1' | '1' | '0..*' | '1..*' | '*';