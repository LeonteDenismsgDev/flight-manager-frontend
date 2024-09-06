import { Itinerary } from "./itinerary";

export class ItineraryResponse{
    constructor(
        public max_itineraries:number,
        public page:Itinerary[]
    ){}
}