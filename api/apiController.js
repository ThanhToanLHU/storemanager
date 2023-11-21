const baseUrl = "https://localhost:7106/";

async function getAllData(path) {
  try {
    const response = await $.ajax({
      url: baseUrl + path,
      method: 'GET',
      dataType: 'json'
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteItemWithId(path, id) {
  try {
    console.log(baseUrl + path + "id?id=" + id)
    const response = await $.ajax({
      url: baseUrl + path + "id?id=" + id,
      method: 'DELETE',
      dataType: 'json'
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function postData(path, data) {
  try {
    const response = await $.ajax({
      url: baseUrl + path,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json', 
      data: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateItemWithId(path, id, data) {
  try {
    const response = await $.ajax({
      url: baseUrl + path + "id?id=" + id,
      method: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}
