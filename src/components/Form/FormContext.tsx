import { createContext, useContext } from "react";
import {FieldHelperProps, FieldInputProps, FieldMetaProps} from "formik";

// Creating the context for the Form.
type FormContextType = {
    field: FieldInputProps<string[]>;
    helpers: FieldHelperProps<string[]>;
    meta: FieldMetaProps<string[]>;
};

export const FormContext = createContext<FormContextType | null>(null);
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("Error in creating the context");
    }
    return context;
};
