import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'

let Form = props => {
    const { handleSubmit } = props
    let errors = ''
    return (
        <form className="withMargins" onSubmit={(vals) => {
            handleSubmit(vals).then(()=>{props.dispatch(reset('login'))}).catch(
                errors = <div className='errors'>Invalid credentials, unable to login.</div>
            )
        }}>
            <div>   
                <Field component="input" required placeholder="Email" type="email" name="email" /><br />
                <Field component="input" required placeholder="Password" type="password" name="password" /><br />
            </div>
            <input className='btn tone1-4-color' type="submit" id="submit" name="submit" value="Login" />
            {errors}
        </form>
    )
}

Form = reduxForm({
    // a unique name for the form
    form: 'login',
    destroyOnUnmount: false
})(Form)

export default Form