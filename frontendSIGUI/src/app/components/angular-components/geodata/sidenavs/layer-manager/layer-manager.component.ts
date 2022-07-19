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


interface GeoDataLayerNode {//GeoDataLayerNode
  id_category: number;
  category?: string;
  name_element: string;
  dataSpatial?: DataSpatial;
  sub_brand?: GeoDataLayerNode[];
}

export class TodoItemFlatNode {
  name_element!: string;
  level!: number;
  expandable!: boolean;
}

  
const TREE_DATA: GeoDataLayerNode[] = [
  {
    id_category: 1,
    name_element: "CAMADA DE ITERAÇOES",
    sub_brand: [{id_category: 1, name_element: "layer_vectorIteration", category: "layer_vectorIteration"}]
  },
  {
    id_category: 2,
    name_element: "CAMADA DE UNIDADES FEDERATIVAS",
    sub_brand: [{id_category: 1, name_element: "layer_vector_unit", category: "layer_vector_unit"}]
  },
  {
    id_category: 3,
    name_element: "CAMADA DE MUNICIPIOS",
    sub_brand: [{id_category: 1, name_element: "layer_vector_county", category: "layer_vector_county"}]
  },
  {
    id_category: 4,
    name_element: "CAMADA DE DISTRITOS",
    sub_brand: [{id_category: 1, name_element: "layer_vector_district", category: "layer_vector_district"}]
  },

  {
    id_category: 5,
    name_element: "CAMADA DE RUAS",
    sub_brand: [{id_category: 1, name_element: "layer_vector_street", category: "layer_vector_street"}]
  },
  {
    id_category: 6,
    name_element: "CAMADA DE INFRAESTRUTURAS",
    sub_brand: [{id_category: 1, name_element: "layer_vector_infrastructure", category: "layer_vector_infrastructure"}]
  },
  {
    id_category: 8,
    name_element: "CAMADA DE EQUIPAMENTOS",
        sub_brand: [{id_category: 1, name_element: "layer_vector_equipament", category: "layer_vector_equipament"}]
  }, 
];

    
@Component({
  selector: 'app-layer-manager',
  templateUrl: './layer-manager.component.html',
  styleUrls: ['./layer-manager.component.css']
})
export class LayerManagerComponent  {

  @Input() layers!:OlMap;

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, GeoDataLayerNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<GeoDataLayerNode, TodoItemFlatNode>();
  
    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;
  
    /** The new item's name */
    newItemName = '';
  
    treeControl!: FlatTreeControl<TodoItemFlatNode>;
  
    treeFlattener!: MatTreeFlattener<GeoDataLayerNode, TodoItemFlatNode>;
  
    dataSource!: MatTreeFlatDataSource<GeoDataLayerNode, TodoItemFlatNode>;
  
    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
 
  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataSource.data = TREE_DATA;


    // _database.dataChange.subscribe(data => {
    //   this.dataSource.data = data;
    // });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: GeoDataLayerNode): GeoDataLayerNode[] => <GeoDataLayerNode[]> node.sub_brand;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.name_element === '';

  transformer = (node: GeoDataLayerNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name_element === node.name_element ? existingNode : new TodoItemFlatNode();
    flatNode.name_element = node.name_element;
    flatNode.level = level;
    flatNode.expandable = !!node.sub_brand?.length;
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
    console.log('clicou')
    this.checklistSelection.toggle(node);
    let verificed : boolean = this.checkNodeElement(node);
    if (verificed == true){
      let element = this.flatNodeMap.get(node);
      console.log(element);
      
      this.layers.getLayers().forEach((layer) => {
        let layerSource = <VectorLayer<VectorSource>> layer
        if (layerSource.get('name') == element?.category){
          // layerSource.getSource()?.clear();
          layerSource.getSource()?.clear();
          console.log('limpou');
        }  
      })

    }

   
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
  
 
