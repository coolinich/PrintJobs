function validateJobModel(job) {
    if (!job.createdBy) return false;
    if (!job.createdDate) return false;
    if (!job.estimatedDuration) return false;
    if (!job.fileName) return false;
    if (!job.jobDescription)return false;
    if (!job.printerModel) return false;
    if (!job.printerType) return false;
    return true;
}

export { validateJobModel };