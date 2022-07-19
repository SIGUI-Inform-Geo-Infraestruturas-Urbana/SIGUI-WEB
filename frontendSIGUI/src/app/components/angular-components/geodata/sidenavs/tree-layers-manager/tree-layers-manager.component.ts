import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataSpatial } from 'src/app/models/data-spatial';

interface GeoDataLayerNode {
  id_element: number;
  category?: string;
  name_element: string;
  dataSpatial?: DataSpatial;
  sub_brand?: GeoDataLayerNode[];
}
  
const TREE_DATA: GeoDataLayerNode[] = [
  {
    id_element: 1,
    name_element: "layer_vectorIteration",
    sub_brand: [{id_element: 1, name_element: "layer_vectorIteration", category: "layer_vectorIteration"}]
  },
  {
    id_element: 2,
    name_element: "layer_vector_unit",
    sub_brand: [{id_element: 1, name_element: "layer_vector_unit", category: "layer_vector_unit"}]
  },
  {
    id_element: 3,
    name_element: "layer_vector_county",
    sub_brand: [{id_element: 1, name_element: "layer_vector_county", category: "layer_vector_county"}]
  },
  {
    id_element: 4,
    name_element: "layer_vector_district",
    sub_brand: [{id_element: 1, name_element: "layer_vector_district", category: "layer_vector_district"}]
  },

  {
    id_element: 5,
    name_element: "layer_vector_street",
    sub_brand: [{id_element: 1, name_element: "layer_vector_street", category: "layer_vector_street"}]
  },
  {
    id_element: 6,
    name_element: "layer_vector_infrastructure",
    sub_brand: [{id_element: 1, name_element: "layer_vector_infrastructure", category: "layer_vector_infrastructure"}]
  },
  {
    id_element: 8,
    name_element: "layer_vector_equipament",
        sub_brand: [{id_element: 1, name_element: "layer_vector_equipament", category: "layer_vector_equipament"}]
  }, 
];

@Component({
  selector: 'app-tree-layers-manager',
  templateUrl: './tree-layers-manager.component.html',
  styleUrls: ['./tree-layers-manager.component.css']
})
export class TreeLayersManagerComponent implements OnInit {  

  @Input() layers!:any;

  treeControl = new NestedTreeControl<GeoDataLayerNode>((node) => node.sub_brand);
  dataSource = new MatTreeNestedDataSource<GeoDataLayerNode>();
  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: GeoDataLayerNode) =>
    !!node.sub_brand && node.sub_brand.length > 0;
  
  ngOnInit(): void {
  }

  descendantsAllSelected(node: GeoDataLayerNode): boolean {
    console.log(node)
    return true;//descAllSelected;
  }

  descendantsPartiallySelected(node: GeoDataLayerNode): boolean {
    console.log(node)
    return true;//descAllSelected;
  }

  todoItemSelectionToggle(node: GeoDataLayerNode): boolean {
    console.log(node)
    return true;//descAllSelected;
  }

  



}
