import { DataSpatial } from "./data-spatial";

export class DataResponse {
    public code: string = '';
    public mensagem: string = '';
    public sub_brand: DataSpatial | null = null; 

    constructor(){

    }
}