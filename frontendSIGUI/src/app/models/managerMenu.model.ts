export class ManagerMenu {
    session_visualization : boolean; 
    session_layers: boolean = false; 
    session_geodata : boolean = false;     

    constructor(){
        this.session_visualization = true;
        this.session_layers = false;
        this.session_geodata = false;       
    }
}