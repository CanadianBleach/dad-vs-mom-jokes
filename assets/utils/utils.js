async function fetchData(url) {
  fetch(url), {
    headers: {
      Accept: "application/json",
    },
  }
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return(data);
    });
}

export { fetchData };
