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

async function getDepartmentObjects(objectIDs, maxIDs = 40, setDepartmentObj) {
  const objectDetails = [];

  try {
    for (const objectId of objectIDs) {
      if (objectDetails.length >= maxIDs) {
        break;
      }

      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
      if (response.ok) {
        const detail = await response.json();
        // console.log("Fetched detail for objectID", objectId, ":", detail);
        objectDetails.push(detail);
        setDepartmentObj(objectDetails)
      } else {
        console.error(`${response.status} ${response.statusText}. Something went wrong with getting object details for objectID ${objectId}`);
        throw new Error(`${response.status} ${response.statusText}. Something went wrong with getting object details.`);
      }
    }
    return objectDetails;
  } catch (error) {
    console.error("Error in getDepartmentObjects:", error);
    throw error;
  }
}

function getSingleArtDetails(artId) {
  return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw new Error(`${response.status} ${response.statusText}. Something went wrong with getting art piece data.`)
    }
  })
  .then(response => response.json())
}

export { getAllMuseumDepartments, getDepartmentObjects, getSingleArtDetails }