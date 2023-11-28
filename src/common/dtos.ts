import {IGate} from "./interfaces";

export type RegisterUserDto = {
    email: string,
    password: string,
    confirmPassword: string,
}

export type LoginUserDto = {
    email: string,
    password: string
}

export type SaveCircuitConfigFileDto = {
    title : string,
    circuitState : object,
    compoundGates : IGate[]
}


export type AuthenticatedUserDto = {
    email: string,
}
