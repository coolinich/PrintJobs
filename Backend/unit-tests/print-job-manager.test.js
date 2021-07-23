import PrintJobsRepository from '../src/business-logic/print-jobs-repository.js';
import PrintJobManager from '../src/business-logic/print-job-manager.js';

jest.mock('../src/business-logic/print-jobs-repository.js');

beforeEach(() => {
    PrintJobsRepository.mockClear(); 
});

describe('Check PrintJobManager ', () => {
    it('gets data from PrintJobsRepository', async () => {
        const printJobsRepositoryMock = new PrintJobsRepository();
        const printJobManager = new PrintJobManager(printJobsRepositoryMock);
        const jobsMocked = [];
        printJobsRepositoryMock.getAllPrintJobs.mockReturnValueOnce(jobsMocked);
        
        const actualResult = await printJobManager.getAllPrintJobs();
    
        expect(actualResult).toBe(jobsMocked);
    });

    it('adds data to PrintJobsRepository', async () => {
        const printJobsRepositoryMock = new PrintJobsRepository();
        const printJobManager = new PrintJobManager(printJobsRepositoryMock);
        const jobToBeAddedMocked =     {
            "createdBy": "Mocked author",
            "createdDate": new Date(),
            "startDate": new Date(),
            "estimatedDuration": "1",
            "fileName": "Mocked_file_name",
            "jobDescription": "Mocked_file_description",
            "printerModel": "Mocked_printer_model",
            "printerType": "Mocked_printer_type",
            "jobStatus": "mocked_status"
        };
    
        printJobsRepositoryMock.addPrintJob.mockReturnValueOnce(jobToBeAddedMocked);
        const actualResult = await printJobManager.addNewPrintJob({...jobToBeAddedMocked});
    
        expect(actualResult.id).not.toBe(undefined);
        expect(actualResult.id).toMatch(/^[0-9a-z]+$/);
    
        delete actualResult.id;
        expect(actualResult).toMatchObject(jobToBeAddedMocked);
    });
});

