const fetchData = async () => {
  try {
    const url = "data.json";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

export default fetchData;