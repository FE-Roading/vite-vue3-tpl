import { AfterFetchContext } from '@vueuse/core'

const afterFetch: (ctx: AfterFetchContext) => Promise<Partial<AfterFetchContext>> | Partial<AfterFetchContext> = async (ctx) => {
  const data = JSON.parse(ctx.data)

  // 如果是通过{ code: xxx}的方式返回错误的
  if (data.code) {
    throw new Error(
      data.message
    )
  }

  ctx.data = data
  return ctx
}

export default afterFetch
