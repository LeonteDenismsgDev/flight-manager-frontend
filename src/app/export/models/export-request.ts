import { CustomCompanyExportRequest } from "./custom-company-export-request";
import { CustomPlaneExportRequest } from "./custom-plane-export-request";
import { CustomUserExportRequest } from "./custom-user-export-request";
import { FilterExportRequest } from "./filter-export-request";

export class ExportRequest{
    constructor(
        public dataType:string,
        public selection:string,
        public request?:CustomUserExportRequest|CustomCompanyExportRequest|CustomPlaneExportRequest|FilterExportRequest
    ){}
}