import { AxiosInstance } from "axios";
import {IBuildOutput} from "../common/interfaces";
import {SaveCircuitConfigFileDto} from "../common/dtos";

class CircuitBuilderAPIService {
    private readonly axios: AxiosInstance;

    constructor (axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    public async getDeviceConnectionStatus(deviceName : string) {
        try {
            return this.axios.get<boolean>(`/devices/connection/${deviceName}`);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async saveCircuitConfigFile(file : SaveCircuitConfigFileDto) {
        try {
            return this.axios.post(`circuit-configs/`, file);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async getSavedCircuitConfigFiles() : Promise<any>{
        try {
            return this.axios.get(`circuit-configs/`);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async removeCircuitConfigFile(id : string) : Promise<any> {
        try {
            return this.axios.delete(`circuit-configs/${id}`);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async saveCircuitBuildOutput(buildOutput: IBuildOutput) : Promise<IBuildOutput> {
        try {
            return this.axios.post(`circuit-builds/`, buildOutput);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async getCircuitBuildOutputs() : Promise<any> {
        try {
            return this.axios.get(`circuit-builds/`);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public removeCircuitBuildOutput(id : string) : Promise<any> {
        try {
            return this.axios.delete(`circuit-builds/${id}`);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default CircuitBuilderAPIService;
