import React, {PropsWithChildren, useEffect, useState} from 'react';
import styles from './BuildOutputChart.module.scss';
import {ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Label} from "recharts";

import _ from 'lodash';

/**
 * key: output data
 * value: number of occurrence
 */
interface IBinaryState {
    key : string,
    value : number
}

const generateBinaryStates = (numQubits : number) => {
    if (numQubits > 10) return; //if numQubits too high too many combinations...
    var states : string [] = [];
    var binaryStates : IBinaryState[] | undefined = [] as IBinaryState[];
    var maxDecimal = parseInt("1".repeat(numQubits),2);
    // For every number between 0-> decimal
    for(var i = 0; i <= maxDecimal; i++){
        // Convert to binary, pad with 0, and add to final resultState : IBinaryStates
        const state = i.toString(2).padStart(numQubits,'0');
        states.push(state);
        binaryStates.push({
            key: state,
            value : 0
        } as IBinaryState)
    }
    return binaryStates;
}

interface BuildOutputChartProps {
    qubitsCount: number,
    outputData : number[][]
}

const BuildOutputChart : React.FC <BuildOutputChartProps> = (props : PropsWithChildren<BuildOutputChartProps>) => {
    const [data, setData]= useState<IBinaryState[]>([]);
    const {qubitsCount, outputData} = props;

    useEffect(() => {
        convertRawDataToBinaryStates(outputData);
    }, [])

    const convertRawDataToBinaryStates = (rawDataArray : number[][]) => {
        const resultBinaryStates = generateBinaryStates(qubitsCount);

        rawDataArray.map((innerArrayItem, index) =>
        {
            const rawDataState = innerArrayItem.join('');
            resultBinaryStates?.forEach((resultState, resultStateIndex) => {
                console.log("decimal value of", parseInt(resultState.key));
                if (parseInt(rawDataState) === parseInt(resultState.key)) {
                    _.set(resultBinaryStates, resultStateIndex, {
                        key: resultState.key,
                        value : resultState.value + 1 || 1
                    })
                }
            })
        });

        if (resultBinaryStates) setData(resultBinaryStates);
    }


    const VerticalLabel = (props : any) => {
        const values = props.value.split(" ");
        const cx = props.viewBox.width - 60;
        const cy = props.viewBox.height/2;
        const rot = `rotate(270 ${cx} ${cy})`;

        return (
            <text
                y={cy}
                transform={rot}
            >

                {
                    values.map((value :any, index: number) => {
                        return value === values[0] ?
                            <tspan key={value + index} x={cx} dy='1.6em'>{value}</tspan> :
                            <tspan key={value + index} x={cx} dy='1.6em'>{value}</tspan>
                    })
                }
            </text>
        );
    };


    const formatTick = (tickItem : any) => {
        return `|${tickItem.toLocaleString()}⟩`
    }

    const renderBarChart = (data : IBinaryState[]) => {
        return <BarChart
            width={500}
            height={435}
            data={data}>
            <XAxis
                tickLine={false}
                stroke="#D3DCED"
                tickFormatter={formatTick}
                strokeWidth={2}
                tick={{ fill: 'black' }}

                dataKey="key"/>
            <YAxis
                tickLine={false}
                stroke="#D3DCED"
                tick={{ fill: 'black' }}
                strokeWidth={2}>
                <Label
                    content={VerticalLabel}
                    value="Measurement"
                    position="left">

                </Label>

            </YAxis>
            <Tooltip cursor={{fill: 'transparent'}} content={<CustomTooltip/>} />
            <Bar dataKey="value" >
                {
                    data?.map((entry, index) => (<Cell key={`cell-${index}`} fill="#576C95"/>))
                }
            </Bar>
        </BarChart>
    }

    return <div className={styles.buildOutputChart}>
        <ResponsiveContainer width="95%" height="80%" aspect={3}>
            {
                data.length !== 0 ? renderBarChart(data) :
                <p>No data available</p>
            }

        </ResponsiveContainer>
    </div>
}

const CustomTooltip = ({active, payload, label} : any) => {
    if (active) {
        return (<div className={styles.customTooltip}>
            <p className={styles.label}>|{label}⟩</p>
            <p className={styles.value}>{payload[0].value}</p>
        </div>);
    }
    return null;

}

export default BuildOutputChart;
