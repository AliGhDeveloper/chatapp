export const postData = async (url, data) => {
    const response = await fetch(process.env.BASE_URL + url, {
        method : 'POST', 
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })

    const result = await response.json();

    return result
}