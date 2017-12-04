import React from 'react'
import { Field, reduxForm } from 'redux-form'

let Form = props => {
    const { handleSubmit, disabled } = props
    return (
        <form className="withMargins" onSubmit={handleSubmit}>
            <div>   
                <Field component="input" disabled={disabled} required placeholder="Name" type="text" name="name" /><br />
                <Field component="input" disabled={disabled} required placeholder="Email" type="email" name="email" /><br />
                <Field component="input" disabled={disabled} required autoComplete="new-password" placeholder="Password" id="password" readOnly onFocus={() => { document.getElementById('password').removeAttribute('readonly') }} type="password" name="password" /><br />
                <Field component="input" disabled={disabled} required placeholder="Confirm Password" type="password" name="confirm_password" /><br />
            </div>
            <input className='btn tone1-4-color' disabled={disabled} type="submit" id="submit" name="submit" value="Create Account" />
        </form>
    )
}

Form = reduxForm({
    // a unique name for the form
    form: 'register',
    destroyOnUnmount: false
})(Form)

export default Form