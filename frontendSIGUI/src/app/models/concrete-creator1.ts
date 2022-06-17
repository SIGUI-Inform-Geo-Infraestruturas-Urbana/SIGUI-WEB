import { County } from "./county.model";
import { CreatorSpatials } from "./creator-spatials";
import { DataSpatial } from "./data-spatial";

export class ConcreteCreator1 extends CreatorSpatials{
    public factoryMethod(): DataSpatial {
        return new County();
    }
}
