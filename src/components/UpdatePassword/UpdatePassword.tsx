import styles from "./UpdatePassword.module.scss";
import React from "react";
import Form from "../Form/Form";
import {
    Formik,
} from 'formik';
import FormLabel from "../Form/FormLabel/FormLabel";
import underlay_quokka_icon from "../../assets/underlay_quokka_icon.svg";



const UpdatePassword : React.FC = () => {
    return <div className={styles.updatePassword} >
        <img className={styles.underlayImage} src={underlay_quokka_icon}/>

        <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
                <Form label="update password" name="update">
                    <Form.FormLabel label="Update Password"/>
                    <Form.FormInput
                        inputType="password"
                        placeholder="Current Password"
                    />
                    <Form.FormInput
                        inputType="password"
                        placeholder="Create New Password"
                    />
                    <Form.FormInput
                        inputType="password"
                        placeholder="Confirm New Password"
                    />
                    <Form.FormButton label="Update"/>
                </Form>
            )}
        </Formik>

    </div>
}

export default UpdatePassword;
