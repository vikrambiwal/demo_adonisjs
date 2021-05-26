import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Bull from '@ioc:Rocketseat/Bull'
import Job from 'App/Jobs/UserRegisterEmail'

import User from 'App/Models/User'

export default class UsersController {
  public async register({ auth, request, response }: HttpContextContract) {
    const validations = schema.create({
      full_name: schema.string(),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })

    try {
    const data = await request.validate({ schema: validations })
    const user = await User.create(data)
    console.log("user: ",user);
    
      Bull.add(new Job().key, user)
      const token = await auth.attempt(data.email, data.password)
      response.status(200).json({
        message: 'Signup Successful',
        data: token,
      })
    } catch (e) {
      console.log("user: ", e);
      return response.badRequest('Invalid credentials')
    }
  }

}
