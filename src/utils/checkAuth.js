export const safeUser = () => {
  try {
    const data = localStorage.getItem("user");
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Ensure valid object
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
};