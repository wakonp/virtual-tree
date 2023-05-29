import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'virtual-tree',
  templateUrl: './virtual-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
      cdk-virtual-scroll-viewport {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class VirtualTreeComponent<T> {
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport?: CdkVirtualScrollViewport;
  @Input({ required: true }) flattenedData?: T[] | null | undefined;
  @Input() itemSize = 32;
}
