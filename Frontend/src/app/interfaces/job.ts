export interface Job {
    "id"?: string,
    "createdBy": string,
    "createdDate": string,
    "startDate"?: string,
    "estimatedDuration": number | string,
    "fileName": string,
    "jobDescription": string,
    "printerModel": string,
    "printerType": string,
    "jobStatus"?: string
}
