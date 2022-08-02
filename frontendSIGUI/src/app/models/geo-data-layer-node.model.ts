import { DataSpatial } from "./data-spatial";

export interface GeoDataLayerNode {//GeoDataLayerNode
  id_category: number;
  category?: string;
  name_element: string;
  dataSpatial?: DataSpatial;
  sub_brand?: GeoDataLayerNode[];
}
