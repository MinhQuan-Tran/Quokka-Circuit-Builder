import React from 'react';
import styles from './ViewOptions.module.scss';
import Grid from '../CircuitArrangement/Grid/Grid';
import Qubit from '../CircuitArrangement/Grid/Qubit/Qubit';
import { Qubit as QubitClass } from "src/common/classes";
import DroppedGates from '../../Gate/DroppedGates/DroppedGates';
import { IGate } from '../../../../common/interfaces';
import { ICircuitState, IQubit } from '../../../../common/interfaces';
import { xorWith } from 'lodash';
import { findQubitFromId, getMaxGatesHorizontally } from 'src/common/helpers';
import { updateQubit } from 'src/redux/actions/circuitConfigAction';
import { useDispatch } from 'react-redux';
import QsimAPIService from "src/api/QsimAPIService";
import APIClient from 'src/api/APIClient';

interface OptionsProps {
    circuitState: ICircuitState;
}

const ViewOptions : React.FC<OptionsProps> = (props) => {
    const {circuitState} = props;
    const dispatch = useDispatch();

    const handleStrongCompress = () => {
        var xBase = 48;
        var xMax = 0;
        var forbidenX:number[] = [];
        for (var i = 0; i < circuitState.droppedGates.length; i++) {
            if (circuitState.droppedGates[i].x > xMax) {xMax = circuitState.droppedGates[i].x}
        }
        var xGatesWidth = ((xMax-xBase)/48) + 1;
        for (var i = 1; i <= xGatesWidth; i++) {
            circuitState.droppedGates.forEach((gate) => {
                if (gate.x == i*48) {
                    var tempx = gate.x;
                    var found = false;
                    while (tempx != 0) {
                        tempx -= 48;
                        circuitState.droppedGates.forEach((findGate) => {
                            if ((gate.type == "CNOT" || gate.type == "Compound Gate") && findGate.x == tempx) {
                                forbidenX.push(tempx + 48);
                                found = true;
                            } else if (findGate.x == tempx && findGate.y == gate.y) {
                                found = true;
                            }
                        });

                        if (forbidenX.includes(tempx)) {
                            found = true;
                        }
                        
                        if (found != false || tempx == 0) {
                            gate.x = tempx + 48;
                            break;
                        }
                    }
                }
            });
        }

        circuitState.droppedGates.forEach((gate) => {
            if (gate.type === "Measurement Gate") {
                const targetQubit: IQubit | null = findQubitFromId(
                    gate.qubitIds[0],
                    circuitState.qubits
                );

                var qubitSize = gate.x/48;
                
                if (targetQubit) {
                    const newQubit = new QubitClass(qubitSize);
                    newQubit.id = targetQubit.id;
                    newQubit.y = targetQubit.y;
                    dispatch(
                    updateQubit(targetQubit.id, "qubitCells", newQubit.qubitCells)
                    );
                }
            }
        });
    }

    const handleWeakCompress = () =>  {
        var xBase = 48;
        var xMax = 0;
        for (var i = 0; i < circuitState.droppedGates.length; i++) {
            if (circuitState.droppedGates[i].x > xMax) {xMax = circuitState.droppedGates[i].x}

        }
        var xGatesWidth = ((xMax-xBase)/48) + 1;


        for (var i = 0; i < xGatesWidth; i++) {
            var x = (i * 48) + xBase;
            var found = false;

            
            for (var j = 0; j < circuitState.droppedGates.length; j++) {
                if (circuitState.droppedGates[j].x === x) {
                    found = true;
                    break;
                }
            }

            if (found === false) {
                for (var j = 0; j < circuitState.droppedGates.length; j++) {
                    if (circuitState.droppedGates[j].x > x && circuitState.droppedGates[j].type != "Measurement Gate") {
                        circuitState.droppedGates[j].x -= 48;
                    }
                }
                xGatesWidth -= 1;
                i -= 1;
            }
        }
    }

    const handleOtherButton = () => {
    }


    return <div className={styles.viewOptions}>
        <div>
            <button onClick={handleStrongCompress}>Strong Compress Circuit</button>
            <button onClick={handleWeakCompress}>Weak Compress Circuit</button>
        </div>
        <button onClick={handleOtherButton}> +  | - </button>
    </div>
}

export default ViewOptions;
