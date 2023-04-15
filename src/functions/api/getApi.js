export function getApiBaseUrl() {
    if (window.location.hostname === "localhost") return 'https://localhost:7202'
    return 'https://mis-rra-api-1.herokuapp.com'
}