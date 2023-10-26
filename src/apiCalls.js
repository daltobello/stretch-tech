function getAllMuseumDepartments() {
  return fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw new Error(`${response.status} ${response.statusText}. Something went wrong with getting all museum departments.`)
    }
  })
  .then(response => response.json())
}

export { getAllMuseumDepartments }