# VirtualTree

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## How to use it

```
npm i virtual-tree
```

Import Module

```
imports: [CommonModule, VirtualTreeModule, ...],
```

Create Component

```
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


export class MyComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new VirtualTreeDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
```

This is a extension of Angular Material Tree example. The main difference is, that now we use the `VirtualTreeDataSource`.

In the template use the `virtual-tree` component as followed:

```
<virtual-tree style="height: 100vh" [flattenedData]="dataSource.flattenedData | async">
  <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
    <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle matTreeNodePadding>
      <button mat-icon-button disabled></button>
      {{ node.name }} : {{ node.level }}
    </mat-tree-node>

    <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
      <button mat-icon-button [attr.aria-label]="'toggle ' + node.filename" (click)="treeControl.toggle(node)">
        <mat-icon class="mat-icon-rtl-mirror">
          {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
        </mat-icon>
      </button>
      {{ node.name }}
    </mat-tree-node>
  </mat-tree>
</virtual-tree>
```
