import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { SectionFiles } from 'src/app/models/section.model';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ModalFilesCountyComponent } from '../modal-files-county/modal-files-county.component';
import { FileUploadsService } from '../service-file/file-uploads.service';

export class TodoItemFlatNode {
  name!: string;
  updated!: Date;
  level!: number;
  expandable!: boolean;
}

@Component({
  selector: 'app-tree-data',
  templateUrl: './tree-data.component.html',
  styleUrls: ['./tree-data.component.css']
})
export class TreeDataComponent implements OnInit , OnChanges{

  @Input() TREE_DATA!:SectionFiles[];

  // TREE_DATA: Section[] = [
  //   {      
  //     name: "Arquivos Selecionados",
  //     updated: new Date('1/1/16'),
  //     sub_brand: [{      
  //       name: "...",
  //       updated: new Date(),
  //       sub_brand: [],
  //     }],
  //   }
  // ];
  
  flatNodeMap = new Map<TodoItemFlatNode, SectionFiles>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<SectionFiles, TodoItemFlatNode>();
  
    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;
  
    /** The new item's name */
    newItemName = '';
  
    treeControl!: FlatTreeControl<TodoItemFlatNode>;
  
    treeFlattener!: MatTreeFlattener<SectionFiles, TodoItemFlatNode>;
  
    dataSource!: MatTreeFlatDataSource<SectionFiles, TodoItemFlatNode>;
  
    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
  constructor(public restApi: RestApiService, private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<ModalFilesCountyComponent>,
    public fileUploadsService :FileUploadsService ,    
    @Inject(MAT_DIALOG_DATA) public data: ManagerSession,
  ) {  
     
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    fileUploadsService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
   // this.dataSource.data = this.TREE_DATA;
  }

  
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: SectionFiles): SectionFiles[] => <SectionFiles[]> node.sub_brand;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.name === '';

  transformer = (node: SectionFiles, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name ? existingNode : new TodoItemFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.sub_brand?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTree(this.TREE_DATA);
    console.log('TESTEFDDSFDSFD')
    console.log(this.TREE_DATA)
  }

  updateTree(data : SectionFiles[]){
    
    // console.log('upDATE---------------')
    // this.dataSource = new MatTreeFlatDataSource(this.treeControl , this.treeFlattener);
    // this.dataSource.data = data ;
  } 

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    console.log('fddsfdfdfdfdfsssssss')
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    console.log('clicou')
    this.checklistSelection.toggle(node);    
    this.checkAllParentsSelection(node);
  }

  checkNodeElement(node: TodoItemFlatNode):boolean{
  
   // let select = this.flatNodeMap.get(node);
    return this.checklistSelection.isSelected(node);
  }

  getVectorLayers(value : number):void{
    console.log('teste')
    let layers = [];
  }


  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


}
