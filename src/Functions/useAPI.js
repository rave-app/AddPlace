export const callAPI = async(url,method,body) => {
    const response = await fetch(url, 
        {
            method: method,
            headers: {
                Accept: "application/json",
                'Content-Type' :'application/json'
            },
            body: body
        })
    const json = await response.json()
    return json
}