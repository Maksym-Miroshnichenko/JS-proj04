import axios from "axios";

async function getItemsByQuery(page) {
  const response = await axios.get(
    `https://deserts-store.b.goit.study/api/desserts?page=${page}&limit=8`
  );
  return response.data.desserts;
}

async function getSortItemsByQuery(page, category) {
  const response = await axios.get(
    `https://deserts-store.b.goit.study/api/desserts?page=${page}&limit=8&category=${category}`
  );
  return response.data.desserts;
}

export { getItemsByQuery, getSortItemsByQuery };