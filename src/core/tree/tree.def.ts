export interface TreeNodeDef {
    children?: TreeNodeDef[];
    id: number;
    sid?: string
    name: string;
    hasChildren?: boolean
    isExpanded?: boolean
}