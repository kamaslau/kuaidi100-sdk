export const doFetch = async (url) => fetch(url).then(res => res.json()).catch(error => console.error(error))