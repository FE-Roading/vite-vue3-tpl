import { useRequest, formatGetParams } from '@/hooks/useRequest'

export function getTruckList () {
  const { data, isFetching } = useRequest<any>(formatGetParams('/trucks', { name: '1111', age: 2 }), { initialData: { initial: 'ddddd' } }).get()

  return {
    data,
    isFetching
  }
}

export function getServerError<T = any> () {
  const { data, isFetching } = useRequest<T>('/sever_error').get()

  return {
    data,
    isFetching
  }
}

export function getClientError<T = any> () {
  const { data, isFetching } = useRequest<T>('/error_400').get()

  return {
    data,
    isFetching
  }
}

export function getCustomError<T = any> () {
  const { data, isFetching } = useRequest<T>('/custom_error').get()

  return {
    data,
    isFetching
  }
}

export function postMockData<T = any> () {
  const { data, isFetching } = useRequest<T>('/custom_error').post({ field1: 'value1' })

  return {
    data,
    isFetching
  }
}
