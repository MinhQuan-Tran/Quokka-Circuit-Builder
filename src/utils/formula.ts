import {DIMENSIONS} from "../common/constants";

/**
 * Rule:
 * - If one or more gates are on single qubit span, then height is
 * of that single qubit span
 * - If one or more gates are on multiple qubit span, then height is
 * of that multiple qubit span (q1_top_y -> qn_bottom_y)
 *
 * @param qubitSpan The number of qubit that the compound gate occupies
 * @param gateHeight The height of a single gate
 * @param qubitGap The height of the gap between gates
 *  |o> - - - [ ]
 *  |o> - - -  |  --> gap
 *  |o> - - - [ ]
 *  +
 */
export const calculateCompoundGateHeight =  (
    qubitSpan: number,
    standardGateHeight: number,
    qubitGap: number,
) : number => {
    return qubitSpan === 1 ?
        standardGateHeight
        :
        (qubitSpan * (standardGateHeight + qubitGap) - qubitGap)
}

export const calculateQubitSpan = (
    gateHeight : number,
    qubitGap : number,
    standardGateHeight : number
) : number => {
    return (gateHeight + qubitGap) / (standardGateHeight + qubitGap);
}


/**
 *
 * @param gridHeight
 * @param gateHeight
 */
export const calculateQubitGap = (
    gridHeight : number,
    gateHeight : number
) : number => {
    return gridHeight - gateHeight ;
}
