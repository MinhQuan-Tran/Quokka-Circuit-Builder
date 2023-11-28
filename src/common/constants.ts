import {IGate} from "./interfaces";
import {Gate, GateExtension} from "./classes";

export const DIMENSIONS = {
    STD_GATE : {
        WIDTH : 40,
        HEIGHT : 38
    },
    GATE_INPUT : {
        MARGIN: {
            TOP : 5,
            LEFT: 12,
        },
        PADDING: {
            TOP: 2,
            LEFT: 5,
        },
        WIDTH : 32,
        HEIGHT : 15,
        TEXT : {
            MARGIN: {
                TOP: 8
            }
        }
    },
    GRID : {
        WIDTH: 48,
        HEIGHT: 64,
        PADDING : {
            TOP: 21,
        }
    },
    ADD_QUBIT_BTN : {
        X_OFFSET: 9,
        Y_OFFSET: 7
    },
    GATE_EXTENSION : {
        WIDTH : 4
    }
}


export const ROUTES = {
    ABOUT : "/about",
    SETUP : "/setup",
    CIRCUIT_BUILDER: "/circuitBuilder",
    CIRCUIT_OUTPUT: "/circuitOutput",
    SAVED_FILES: "/account/savedFiles",

    BUILD_OUTPUT: "/buildOutput",
    LOGIN: "/login",
    PAGE_NOT_FOUND: "*",
    UPDATE_PASSWORD: "/updatePassword"
}
