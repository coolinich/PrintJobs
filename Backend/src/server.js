import express from 'express';
import cors from 'cors';
import * as defaultDataSource from '../data/jobs.js';
import { generateID } from './utils.js';

class Server {
    constructor() {
        this.app = express();
        this.server();
        this.routes();
    }

    routes() {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.get('/jobs', async (req, res) => {
            let listOfAllJobs = await defaultDataSource.jobs;
            return res.json(listOfAllJobs);
        })

        this.app.post('/job', async (req, res) => {
            const { job } = req.body;
            let listOfAllJobs;
            if (!job) {
                return res.status(400).send({
                    statusCode: 400,
                    errorMessage: "Bad request"
                })
            }
            job.id = generateID();
            defaultDataSource.jobs.push(job);
            listOfAllJobs = await defaultDataSource.jobs;
            return res.json(listOfAllJobs);
        })

        this.app.use((req, res) => {
            res.status(404).send({
                statusCode: 404,
                errorMessage: "This page is not found"
            })
        })
    }

    server() {
        this.app.listen(3001, () => {
            console.log("Server is runnung on port 3001");
        });
    }
}

export default new Server();