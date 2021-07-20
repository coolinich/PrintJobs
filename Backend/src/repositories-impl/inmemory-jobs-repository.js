export default class InMemoryJobsRepository {
    constructor() {
        this.jobs = [];
    }

    async addPrintJob(job) {
        this.jobs.push(job);
    }

    async getAllPrintJobs() {
        return this.jobs;
    }
}