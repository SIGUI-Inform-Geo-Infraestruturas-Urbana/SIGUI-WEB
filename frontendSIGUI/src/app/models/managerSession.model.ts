export class ManagerSession {
    session_visualization : boolean; 
    session_country: boolean = false; 
    session_state : boolean = false; 
    session_county : boolean = false; 
    session_ditrict : boolean = false; 
    session_streat : boolean = false; 
    session_component : boolean = false; 

    constructor(){
        this.session_visualization = true;
        this.session_country = false;
        this.session_state = false;
        this.session_county = false;
        this.session_ditrict = false;
        this.session_state = false;
        this.session_component = false;
    }
}