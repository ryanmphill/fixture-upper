const isProduction = import.meta.env.PROD

export const apiUrl = isProduction 
    ? import.meta.env.VITE_API_SERVER_URL 
    : "http://localhost:8000";