const API_BASE_URL = "http://localhost:5000/api"; // your backend base URL

export async function getMachines() {
  try {
    const res = await fetch(`${API_BASE_URL}/machines`);
    if (!res.ok) throw new Error("Failed to fetch machines");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch machines:", err);
    throw err;
  }
}

export async function fetchMachines({ page = 1, limit = 10 } = {}) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/machines?page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch machines with pagination");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch machines with pagination:", err);
    throw err;
  }
}

export async function getMachineById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/machines/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch machine ${id}`);
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch machine ${id}:`, err);
    throw err;
  }
}
