export const convertToFixture = async (userInputData) => {
    const res = await fetch(`http://localhost:8000/converter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userInputData)
    });
    return await res.json();
  }