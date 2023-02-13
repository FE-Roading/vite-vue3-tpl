import { createFetch, CreateFetchOptions } from '@vueuse/core'
import type { useFetch } from '@vueuse/core'
import afterFetch from './afterFetch'
import beforeFetch from './beforeRequest'
import onFetchError from './onFetchError'

const requestOptions: CreateFetchOptions = {
  baseUrl: 'http://rap2api.taobao.org/app/mock/303151',
  options: {
    beforeFetch,
    afterFetch,
    onFetchError
  }
}

export const useRequest = createFetch(requestOptions)
