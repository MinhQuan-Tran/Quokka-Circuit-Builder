import {AxiosInstance} from "axios";
import {IGate, IQASMRequestBody, IQubit} from "../common/interfaces";
import {gateToQASM, getMaxGatesHorizontally} from "../common/helpers";


class QsimAPIService {
    private readonly axios: AxiosInstance;

    constructor(axiosInstance : AxiosInstance) {
        this.axios = axiosInstance;
    }

    public async getDeviceConnectionStatus(deviceName: string) {
        try {
            return this.axios.get<boolean>(`/devices/connection/${deviceName}`);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    createQASMScript(qubits : IQubit[], droppedGates : IGate[]) {
        let qasmGatesScript = "";

        var xMax = 0;
        var yMax = qubits.length;

        for (var i = 0; i < droppedGates.length; i++) {
            if (droppedGates[i].x > xMax) {xMax = droppedGates[i].x}
        }

        xMax /= 48;

        for (var i = 0; i <= xMax; i++) {
            for (var j = 0; j <= yMax; j++) {
                droppedGates.forEach((droppedGate) => {
                    if (droppedGate.x == i*48 + 48 && droppedGate.y == j*64 + 21) {
                        qasmGatesScript += this.createQASMGateScript(qubits, droppedGate);
                        console.log("HERE");
                    }
                });
            }
        }
        
        const finalQASMScript = `OPENQASM 2.0;\n`+
            `qreg q[${qubits.length}];\n`+
            `creg c[${qubits.length}];${qasmGatesScript}\n`;
        return finalQASMScript;
    }

    createQASMGateScript = (qubits : IQubit[], gate : IGate) => {
        try {
            var qasmGateScript = "";
            if (gate.type === 'CNOT') {
                qasmGateScript = `\ncx q[${this.findQubitIndex(gate.gateExtension.qubitId, qubits)}],` +
                `q[${this.findQubitIndex(gate.qubitIds[0], qubits)}];`;
            } else if (gate.type === 'Measurement Gate') {
                qasmGateScript = `\nmeasure q[${this.findQubitIndex(gate.qubitIds[0], qubits)}]`
                + ` -> `
                + `c[${this.findQubitIndex(gate.qubitIds[0], qubits)}];`;

            } else if (gate.type === 'Compound Gate'){
                if (gate.includedGates) {
                    gate.includedGates.forEach((gate) => {
                        qasmGateScript += this.createQASMGateScript(qubits, gate);
                    });
                    console.log("qasmGateScript=", qasmGateScript)
                }
            }
            else
            {
                qasmGateScript = `\n${gateToQASM(gate)} q[${this.findQubitIndex(gate.qubitIds[0], qubits)}];`;
            }
            console.log("qasmGateScript=", qasmGateScript)
            return qasmGateScript;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }


    findQubitIndex = (id: string, qubits : IQubit[]) => {
        return qubits.findIndex((qubit) => {
            return qubit.id === id;
        });
    }

    async runQASMScript(script : string, runCount : number, stateVector : boolean) {
        const qasmRequestBody : IQASMRequestBody = {
            script : script as string,
            count : runCount as number,
            state_vector : stateVector as boolean,
        }

        console.log('qasmRequestBody:', JSON.stringify(qasmRequestBody));
        return await this.sendQASMRequest(qasmRequestBody);
    }

    async sendQASMRequest(qasmRequestBody : IQASMRequestBody) {
        try {
            return this.axios.post(`/qsim/qasm`, qasmRequestBody);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

}

export default QsimAPIService;
