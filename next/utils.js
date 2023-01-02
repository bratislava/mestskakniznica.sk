// frontend/utils.js
const baseUrl = process.env.BASE_URL
async function fetchQuery(path, params = null) {
  let url
  url = params !== null ? `${baseUrl}/${path}/${params}` : `${baseUrl}/${path}`
  const response = await fetch(`${url}`)
  return await response.json()
}
export { baseUrl, fetchQuery }
