import express from 'express';
import cors from 'cors';
import PrintJobManager from './business-logic/print-job-manager.js';
import InMemoryJobsRepository from './repositories-impl/inmemory-jobs-repository.js';
import { validateJobModel } from './model.js'

const PORT = 3001;

class Server {
    constructor() {
        this.configureDependencies();
        this.app = express();
        this.configureServer();  
        this.startServer();
    }

    configureDependencies() {
        const repository = new InMemoryJobsRepository();
        this.printJobManager = new PrintJobManager(repository);
    } 

    configureServer() {
        this.app.use(express.json());
        this.app.use(cors());
       
        let printJobManager = this.printJobManager;
       
        this.app.get('/jobs', async (req, res) => {
            const listOfAllJobs = await printJobManager.getAllPrintJobs();
            return res.json(listOfAllJobs);
        })
       
        this.app.post('/job', async (req, res) => {
            const { job } = req.body;
            if (!job || !validateJobModel(job)) {
                return res.status(400).send({
                    statusCode: 400,
                    errorMessage: "Bad request"
                })
            }
            const newJob = await printJobManager.addNewPrintJob(job);
            return res.status(201).json(newJob);
        }); 
        
        this.app.use((req, res) => {
            res.status(404).send({
                statusCode: 404,
                errorMessage: "This page is not found"
            })
        })
    }

    startServer() {
        this.app.listen(PORT, () => {
            console.log(`Server is runnung on http://localhost:${PORT}`);
        });
    }
}

export default new Server();
