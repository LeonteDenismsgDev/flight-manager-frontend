import { Company } from "src/app/company/models/company";

export class CustomUserExportRequest{
    constructor(
        public company:string,
        public role:string[]
    ){}
}