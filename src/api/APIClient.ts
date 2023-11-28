import axios, {AxiosRequestConfig} from "axios";
import CircuitBuilderAPIService from "./CircuitBuilderAPIService";
import QsimAPIService from "./QsimAPIService";
import AuthService from "./AuthService";

class APIClient {
    public readonly circuitBuilderAPIService : CircuitBuilderAPIService;
    public readonly qsimAPIService : QsimAPIService;
    public readonly authService : AuthService;
    private readonly DEVELOPMENT_BASE_URL = "http://localhost:8080";
    private readonly PRODUCTION_BASE_URL = "https://theq-circuitbuilder-api.fordevpurposeonly.com/";
    private readonly QSIM_API_NGROK_URL = `https://${window.sessionStorage.getItem('deviceName')}.au.ngrok.io`;
    constructor() {

        // This instance is for interacting with the Q builder backend
        const circuitBuilderAPIAxiosInstance = axios.create({
            baseURL: this.PRODUCTION_BASE_URL,
            // baseURL: this.DEVELOPMENT_BASE_URL,
        });

        // This instance is for interacting directly with the Q simulator device
        const qsimAPIAxiosInstance = axios.create({
            baseURL: this.QSIM_API_NGROK_URL
        })

        circuitBuilderAPIAxiosInstance.interceptors.request.use(async (config : AxiosRequestConfig) => {
            const accessToken : string | null = localStorage.getItem('access_token');
            if (config.headers && accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                return config;
            } else {
                return config;
            }

        })

        this.circuitBuilderAPIService = new CircuitBuilderAPIService(circuitBuilderAPIAxiosInstance);
        this.authService = new AuthService(circuitBuilderAPIAxiosInstance);
        this.qsimAPIService = new QsimAPIService(qsimAPIAxiosInstance);
    }
}

export default APIClient;
