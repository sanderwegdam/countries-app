
const fetchData = async (show) => {
  try {
    const url = "data.json";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    let data;
    data = await response.json(); // Sla de gegevens op in de "data" variabele
    show(data);
  } catch (error) {
    console.error(error); // Toon de fout in de console
  }
};

export default fetchData;