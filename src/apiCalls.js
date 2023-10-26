function getAllMuseumDepartments() {
  return fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11")
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw new Error(`${response.status} ${response.statusText}. Something went wrong with getting all museum departments.`)
    }
  })
  .then(response => response.json())
}



function getObject(objectId) {
  return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Failed to retrieve object details for ID ${objectId}`);
      }
    });
}

function getObjects(arrayOfObjectIds) {
  const objectPromises = arrayOfObjectIds.map((objectId) => getObject(objectId));
  return Promise.all(objectPromises);
}

export { getAllMuseumDepartments, getObjects}