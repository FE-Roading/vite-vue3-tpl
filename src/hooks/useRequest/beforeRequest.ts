import { BeforeFetchContext } from '@vueuse/core'

const beforeFetch: (ctx: BeforeFetchContext) => Promise<Partial<BeforeFetchContext> | void> | Partial<BeforeFetchContext> | void = async (ctx) => {
  ctx.options.headers = updateFetchHeaders(ctx.options.headers)

  return ctx
}

export default beforeFetch

// @ts-ignore: HeadersInit会提示undef
// eslint-disable-next-line
function updateFetchHeaders (headers?: HeadersInit) {
  headers = headers ?? new Headers()

  // 添加token
  const myToken = 'Token'
  updateHeaderField(headers, 'Authorization', myToken)

  return headers
}
// eslint-disable-next-line
function updateHeaderField (headers: HeadersInit, name: string, value: any) {
  if (Array.isArray(headers)) {
    headers.push([
      name,
      value
    ])
  } else if (headers instanceof Headers) {
    headers.append(name, value)
  } else {
    (headers as Record<string, string>)[name] = value
  }
}
