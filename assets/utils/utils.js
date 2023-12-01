async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { fetchData };
