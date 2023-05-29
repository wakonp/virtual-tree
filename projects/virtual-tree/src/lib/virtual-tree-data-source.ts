import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, map, merge, startWith, switchMap } from 'rxjs';

export class VirtualTreeDataSource<T, F, K> extends DataSource<F> {
  readonly flattenedData = new BehaviorSubject<F[]>([]);
  private readonly expandedData = new BehaviorSubject<F[]>([]);

  get data() {
    return this._data.value;
  }
  set data(value: T[]) {
    this._data.next(value);
    this.flattenedData.next(this._treeFlattener.flattenNodes(this.data));
    this._treeControl.dataNodes = this.flattenedData.value;
  }
  private readonly _data = new BehaviorSubject<T[]>([]);

  constructor(
    private _treeControl: FlatTreeControl<F, K>,
    private _treeFlattener: MatTreeFlattener<T, F, K>,
    initialData?: T[],
  ) {
    super();

    if (initialData) {
      // Assign the data through the constructor to ensure that all of the logic is executed.
      this.data = initialData;
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<F[]> {
    return merge(this._treeControl.expansionModel.changed, this.flattenedData).pipe(
      switchMap(() =>
        collectionViewer.viewChange.pipe(
          map((range) => {
            this.expandedData.next(
              this._treeFlattener.expandFlattenedNodes(this.flattenedData.value, this._treeControl),
            );
            return this.expandedData.value.slice(range.start, range.end);
          }),
        ),
      ),
    );
  }
  connectWithVirtualViewer(collectionViewer: CdkVirtualScrollViewport): Observable<F[]> {
    return merge(this._treeControl.expansionModel.changed, this.flattenedData).pipe(
      switchMap(() =>
        collectionViewer.renderedRangeStream.pipe(
          startWith(collectionViewer.getRenderedRange()),
          map((range) => {
            this.expandedData.next(
              this._treeFlattener.expandFlattenedNodes(this.flattenedData.value, this._treeControl),
            );
            return this.expandedData.value.slice(range.start, range.end);
          }),
        ),
      ),
    );
  }
  disconnect(): void {}
}
