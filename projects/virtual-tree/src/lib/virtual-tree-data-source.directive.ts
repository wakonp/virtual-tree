import { CdkTree } from '@angular/cdk/tree';
import { AfterViewInit, Directive, Input, inject } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { VirtualTreeDataSource } from './virtual-tree-data-source';
import { VirtualTreeComponent } from './virtual-tree.component';

@Directive({
  selector: 'mat-tree[dataSource], cdk-tree[dataSource]',
})
export class VirtualTreeDataSourceDirective<T, F, K> implements AfterViewInit {
  readonly virtualTree = inject(VirtualTreeComponent);
  readonly matTree = inject(CdkTree);
  @Input() set dataSource(dataSource: VirtualTreeDataSource<T, F, K> | null | undefined) {
    this.currentDataSource.next(dataSource);
  }
  readonly currentDataSource = new BehaviorSubject<VirtualTreeDataSource<T, F, K> | null | undefined>(undefined);

  ngAfterViewInit() {
    const viewport = this.virtualTree.viewport;
    if (!viewport) return;
    this.matTree.dataSource = this.currentDataSource.pipe(
      switchMap((dataSource) => dataSource?.connectWithVirtualViewer(viewport) ?? new BehaviorSubject([])),
    );
  }
}
