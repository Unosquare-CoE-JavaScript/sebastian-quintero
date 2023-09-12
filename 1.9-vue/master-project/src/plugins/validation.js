import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  alpha_spaces,
  confirmed,
  email,
  max,
  max_value,
  min,
  min_value,
  not_one_of,
  required
} from '@vee-validate/rules'

export const veeValidatePlugin = {
  install(app, options) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('email', email)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('passwords_mismatch', confirmed)
    defineRule('not_one_of', not_one_of)
    defineRule('country_excluded', not_one_of)

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `The filed ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high`,
          not_one_of: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded: `Due to restrictions, we do not accept users from this location.`,
          passwords_mismatch: "The passwords don't match",
          tos: 'You must accept the Terms of Service.'
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`

        return message
      },
      validateOnBlur: false,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
