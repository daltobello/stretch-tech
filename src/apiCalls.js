const handleErrors = (response) => {
  if (!response.ok) {
    switch(response.status) {
      case 404:
        throw new Error("Sorry, that art piece doesn't exist.");
      case 500:
        throw new Error("This is a bad request,  please try again later.");
      default:
        throw new Error("An error occured, please return home.");
    }
  }
  return response.json();
}

function getAllMuseumDepartments() {
  return fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11")
  .then(handleErrors)
  .catch(console.log("error in network request"))
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
  .then(handleErrors)
}

export { getAllMuseumDepartments, getDepartmentObjects, getSingleArtDetails }