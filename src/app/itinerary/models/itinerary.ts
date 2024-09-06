import { Plane } from "src/app/plane/models/Plane";
import { Time } from "./time";

export class Itinerary{
    constructor(
        public ID:string,
        public departure:string,
        public arrival:string,
        public departureTime:Time,
        public arrivalTime:Time,
        public flightNumber:string,
        public crewNumber:string,
        public lateDepartureMinutes:number,
        public lateArrivalMinutes:number,
        public departureTimeFormatted:string,
        public arrivalTimeFormatted:string
    ){}
}