import { DataSpatial } from "./data-spatial";
import { ManagerMenu } from "./managerMenu.model";

export class controlViewData {
    public managerMenu : null |ManagerMenu;   
    public dataSpatial : null |DataSpatial;  

    constructor(){
        this.managerMenu = null;
        this.dataSpatial = null;     
    }
}