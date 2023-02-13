import { ClientErrors, ServerErrors } from './OrderedHttpStatusCodes'

type ErrorData = {
  status: number,
  message: string
}
function messageFormatter (message: string | null, status?: number, url?: string): ErrorData {
  if (status && message) {
    return {
      status,
      message
    }
  }
  status = status ?? -1

  switch (status) {
    case ClientErrors.BadRequest:
      message = '请求错误'
      break
    case ClientErrors.Unauthorized:
      message = '未授权，请登录'
      break
    case ClientErrors.Forbidden:
      message = '拒绝访问'
      break
    case ClientErrors.NotFound:
      message = `请求地址出错: ${url}`
      break
    case ClientErrors.RequestTimeout:
      message = '请求超时'
      break
    case ServerErrors.InternalServerError:
      message = '服务器内部错误'
      break
    case ServerErrors.NotImplemented:
      message = '服务未实现'
      break
    case ServerErrors.BadGateway:
      message = '网关错误'
      break
    case ServerErrors.ServiceUnavailable:
      message = '服务不可用'
      break
    case ServerErrors.GatewayTimeout:
      message = '网关超时'
      break
    case ServerErrors.HttpVersionNotSupported:
      message = 'HTTP版本不受支持'
      break
    default:
      message = '未知错误'
      break
  }

  return {
    status,
    message
  }
}

export function errorHandler (data: any, response: Response | null) {
  let errorData: ErrorData

  // 表明该错误是在afterFetch中扔出的业务报错逻辑
  if (response?.status == 200) {
    const _data = JSON.parse(data)
    errorData = messageFormatter(_data.message ?? '后端业务报错，未返回具体的报错信息', _data.code ?? -2)
  } else {
    errorData = messageFormatter(null, response?.status, response?.url)
  }

  return errorData
}

export default errorHandler
