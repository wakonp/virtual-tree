import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VirtualTreeDataSourceDirective } from './virtual-tree-data-source.directive';
import { VirtualTreeComponent } from './virtual-tree.component';

@NgModule({
  declarations: [VirtualTreeDataSourceDirective, VirtualTreeComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [VirtualTreeDataSourceDirective, VirtualTreeComponent],
})
export class VirtualTreeModule {}
