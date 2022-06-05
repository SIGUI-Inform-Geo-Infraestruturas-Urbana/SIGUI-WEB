export class StateEntity {
    id_state : number = 0;
    name_state : string = '';
    cod_uf : string = '';
    initials_uf : string = '';
    nome_region : string = '';
    area_state : number = 0;
    geometry : string = '';

    constructor(id : any = 0){
        this.id_state = id;
    }

    deserialize(inputData : any) {
        Object.assign(this,inputData);
        return this;
        // this.id_state = inputData.id_state;
        // this.name_state = inputData.name_state;
        // this.co = inputData.name_state;
        // this.name_state = inputData.name_state;
        // this.name_state = inputData.name_state;

    }
}