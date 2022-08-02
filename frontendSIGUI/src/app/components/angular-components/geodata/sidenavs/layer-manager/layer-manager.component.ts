import { Component, Input, OnInit } from '@angular/core';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } 
    from "@angular/material/tree";
import { DataSpatial } from 'src/app/models/data-spatial';
import { SelectionModel } from '@angular/cdk/collections';
import OlMap from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoDataNode } from 'src/app/models/geo-data-node';
import { ManipulateLayersService } from '../manipulate-layers.service';
import { DataSpatialService } from 'src/app/services/count/data-spatials.service';
import { Style } from 'ol/style';




export class TodoItemFlatNode {
  id !: number;
  idMap !: number;
  name_element!: string;
  typeRepresentation !: string; 
  level!: number;
  expandable!: boolean;
}

@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent  {

  @Input() layers!:OlMap;

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, GeoDataNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<GeoDataNode, TodoItemFlatNode>();
  
    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;
  
    /** The new item's name */
    newItemName = '';
  
    treeControl!: FlatTreeControl<TodoItemFlatNode>;
  
    treeFlattener!: MatTreeFlattener<GeoDataNode, TodoItemFlatNode>;
  
    dataSource!: MatTreeFlatDataSource<GeoDataNode, TodoItemFlatNode>;
  
    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
  constructor(
    public dataSpatialService : DataSpatialService ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    // this.dataSource.data = TREE_DATA;

    dataSpatialService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });


    // _database.dataChange.subscribe(data => {
    //   this.dataSource.data = data;
    // });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: GeoDataNode): GeoDataNode[] => <GeoDataNode[]> node.dataNodes;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.name_element === '';

  transformer = (node: GeoDataNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name_element === node.name_element ? existingNode : new TodoItemFlatNode();
    flatNode.name_element = <string> node.name_element;
    flatNode.level = level;
    flatNode.expandable = !!node.dataNodes?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
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
    console.log('clicou togle')
    this.checklistSelection.toggle(node);
    let verificed : boolean = this.checkNodeElement(node);

    let element = this.flatNodeMap.get(node);
    console.log(element);

    this.layers.getLayers().forEach((layer) => {
      let layerSource = <VectorLayer<VectorSource>> layer
      if (layerSource.get('name') == element?.typeRepresentation){//'layer_vectorIteration'
        let a = layerSource.getSource()?.getFeatureById(<number>element?.idMap)
        if (verificed == true){
          a?.setStyle(new Style())
        }
        else{
          let style = layerSource.getStyle();
          a?.setStyle(<Style>style)
        }      
      }
    })

  
    
      
      // this.layers.getLayers().forEach((layer) => {
      //   let layerSource = <VectorLayer<VectorSource>> layer
      //   // // // if (layerSource.get('name') == element?.category){
      //   // // //   // layerSource.getSource()?.clear();
      //   // // //   layerSource.getSource()?.clear();
      //   // // //   console.log('limpou');
      //   // // // }  
      // })

 



   
    this.checkAllParentsSelection(node);
  }

  checkNodeElement(node: TodoItemFlatNode):boolean{
  
   // let select = this.flatNodeMap.get(node);
    return this.checklistSelection.isSelected(node);
  }

  getVectorLayers(value : number):void{
    console.log('teste')
    let layers = [];
    // let select = this.optionsDraws.find( a => a.id == value)?.name
    // this.map.getLayers().forEach((layer) => {
    //   let layerSource = <VectorLayer<VectorSource>> layer
    //   if (layerSource.get('name') == select){
    //     layerSource.getSource()?.clear();
    //     console.log('limpou');
    //   }  
    // })
   // console.log(this.layers)
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
  
 
