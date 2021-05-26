import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async register({ auth, request, response }: HttpContextContract) {
    const validations = schema.create({
      full_name: schema.string(),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })

    const data = await request.validate({ schema: validations })
    await User.create(data)

    try {
      const token = await auth.attempt(data.email, data.password)
      response.status(200).json({
        message: 'Signup Successful',
        data: token,
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

}
