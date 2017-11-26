import React from 'react'
import { Field, reduxForm } from 'redux-form'

let Form = props => {
    const { handleSubmit } = props
    return (
        <form className="withMargins" onSubmit={handleSubmit}>
            <div>   
                <Field component="input" required placeholder="Email" type="email" name="email" /><br />
                <Field component="input" required placeholder="Password" type="password" name="password" /><br />
            </div>
            <input className='btn blue-color' type="submit" id="submit" name="submit" value="Login" />
        </form>
    )
}

Form = reduxForm({
    // a unique name for the form
    form: 'login',
    destroyOnUnmount: false
})(Form)

export const LoginForm = Form