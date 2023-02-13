export function formatGetParams (url: string, queries: Record<string, any>) {
  if (!queries) return url

  const queryStr = Object.keys(queries).filter(key => queries[key] != null && queries[key] != undefined).map(key => `${key}=${queries[key]}`).join('&')

  const urls = decodeURIComponent(url).trim().split('?')
  const path = urls[0]
  const oldQuery = urls[1]?.trim() ?? ''

  if (oldQuery.length == 0) return `${path}?${queryStr}`
  const oldQueryStr = oldQuery.split('&')
    .map(str => str.split('='))
    .filter(item => item.length == 2 && item[2] !== 'null' && item[2] !== 'undefined' && item[2] !== '')
    .map(item => `${item[0]}=${item[1]}`).join('&')
  const latestQueryStr = oldQueryStr.length == 0 ? queryStr : oldQuery + '&' + queryStr

  return `${path}?${latestQueryStr}`
}
