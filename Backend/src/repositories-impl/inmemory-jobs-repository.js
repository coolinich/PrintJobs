import PrintJobsRepository from '../business-logic/print-jobs-repository.js';

export default class InMemoryJobsRepository extends PrintJobsRepository {
    constructor() {
        super();
        this.jobs = [];
    }

    async addPrintJob(job) {
        this.jobs.push(job);
    }

    async getAllPrintJobs() {
        return this.jobs;
    }
}