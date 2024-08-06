import { Airport } from "./Airport";

export class AirportResponse{
    constructor(
        public page:Airport[],
        public max_airports: number
    ){}
}