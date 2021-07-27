const endPoint = 'https://jsonplaceholder.typicode.com'

const api = {
  fetchComment : (page, limit) => {
    return fetch(`${endPoint}/comments?_page=${page}&_limit=${limit}`).then(res => res.json())
  }
}

export default api;