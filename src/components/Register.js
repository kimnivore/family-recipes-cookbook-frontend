import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
// import axios from 'axios';
import schema from './validations/Schema';
import * as yup from 'yup';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { register } from '../actions';

const initialFormValues = {
    username: '',
    password: ''
};
const initialFormErrors = {
    username: '',
    password: ''
};
const initialDisabled = true;

const Register = ({ register }) => {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: ''}))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
    };

    const handleChange = (e, name, value) => {
        validate(name, value);
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        register(formValues)
       push('/recipes');
        }
        
    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
            setDisabled(!valid)
        });
    }, [formValues]);

    //    const handleCreate = () => {
    //     push('/login');
    // }

    if(localStorage.getItem('token')) {
        return <Redirect to='/recipes' />
    } else {
    return (
    <RegisterContainer>
        <h1>Register your account</h1>
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input
                    type='text'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                />
                    {formErrors.username && <p>{formErrors.username}</p>}
                </label>
                <label>Password:
                    <input
                    type='password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                />
                    {formErrors.password && <p>{formErrors.password}</p>}
                </label>
                <button disabled={disabled}>Register</button>
                {/* <button onClick={handleCreate} className = "CreateAccountButton">Login</button> */}
            </form>
        </FormContainer>
    </RegisterContainer>
    )
}
}

const mapStateToProps = (state) => {
    return ({
        registering: state.registering,
    });
}

export default connect(mapStateToProps, { register })(Register);



const RegisterContainer = styled.div`
    height: 100vh;
    border: 1px solid black;
    width: 100vw;
    margin: auto;

    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    `
const FormContainer = styled.div`
    height: 40vh;
    border: 1px solid black;
    width: 20vw;
    margin: auto;
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 25%;
        padding: 20px;
        margin: 50px auto ; 
        font-size: 1.5rem;
        }
    button{
        display:flex;
        flex-direction:row;
        background-color:black;
        color:white;
        border-radius: 10px;
        font-size: 1.75rem;
        font-family: 'Roboto Mono', monospace;
        padding:1rem;
        margin: 1rem;
        border: none;
        }
    label{
        margin: 10px;
    }
`
