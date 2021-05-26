import { JobContract } from '@ioc:Rocketseat/Bull'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class UserRegisterEmail implements JobContract {
  public key = 'UserRegisterEmail'
  public onCompleted(job, result) {
    console.log("onCompleted job: ", data);
  }

  public onActive(job) {
    console.log("onActive job: ", job);
  }


  public async handle(job) {
    const { data } = job
    console.log("User data: ", data);
    
  }
}
