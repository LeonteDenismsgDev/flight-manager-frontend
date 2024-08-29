import { Plane } from "./Plane";

export class PlaneResponse{
    constructor(
        public max_planes:number,
        public page:Plane[]
    ){}
}