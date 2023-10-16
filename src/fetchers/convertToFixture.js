import { apiUrl } from "./apiConfig";

export const convertToFixture = async (userInputData) => {
    const res = await fetch(`${apiUrl}/converter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userInputData)
    });
    return await res.json();
  }