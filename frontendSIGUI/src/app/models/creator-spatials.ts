import { abstract } from "ol/util";
import { DataSpatial } from "./data-spatial";

export abstract class CreatorSpatials {

    public abstract factoryMethod(): DataSpatial;

    public createOperation(): string{
        const dataSpatial = this.factoryMethod();

        return `creator: ${dataSpatial}`;
    }
}
