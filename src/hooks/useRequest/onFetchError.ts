import { OnFetchErrorContext } from '@vueuse/core'
import errorHandler from './errorHandler'

const onFetchError: (ctx: {
  data: any;
  response: Response | null;
  error: any;
}) => Promise<Partial<OnFetchErrorContext>> | Partial<OnFetchErrorContext> = async (ctx) => {
  const errorData = errorHandler(ctx.data, ctx.response)

  console.log(errorData.status, errorData.message)

  return ctx
}

export default onFetchError
