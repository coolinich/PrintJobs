import { generateID } from '../utils.js';

export default class PrintJobManager {
    constructor(printJobsRepository) {
        this.printJobsRepository = printJobsRepository;
    }

    async addNewPrintJob(job) {
        job.id = generateID();
        await this.printJobsRepository.addPrintJob(job);
        return job;
    }

    async getAllPrintJobs() {
        return await this.printJobsRepository.getAllPrintJobs();
    }
};