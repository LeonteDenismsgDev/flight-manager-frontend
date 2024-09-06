export class Time{
    constructor(
        public hour:number,
        public minute:number,
        public day:number,
        public month:number,
        public year:number
    ){}

    public toString():string{
        return this.hour+":"+this.minute;
    }
}