import { SettingsRoutingModule } from "../settings-routing.module";

export class EditUserRequestAdmin{
    constructor(
        public username:string|null,
        public firstName:string,
        public lastName:string,
        public contactData:{[key:string]:string},
        public address:string,
        public role:string,
        public company:string,
        public enabled:boolean = true
    ){}
}