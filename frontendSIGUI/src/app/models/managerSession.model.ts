export class ManagerSession {
    session_visualization : boolean; 
    session_country: boolean = false; 
    session_state : boolean = false; 
    session_county : boolean = false; 
    session_ditrict : boolean = false; 
    session_streat : boolean = false; 
    session_public_place : boolean = false; 
    session_infrastructure : boolean = false; 
    session_estructure : boolean = false; 
    session_network : boolean = false; 

    constructor(){
        this.session_visualization = true;
        this.session_country = false;
        this.session_state = false;
        this.session_county = false;
        this.session_ditrict = false;
        this.session_state = false;
        this.session_streat = false;
        this.session_public_place = false;
        this.session_infrastructure = false;
        this.session_estructure = false;
        this.session_network = false;
    }
}