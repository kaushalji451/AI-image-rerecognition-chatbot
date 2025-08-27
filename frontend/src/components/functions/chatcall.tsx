const chatresponce = async (data: string, work?: string) => {
    if(work == undefined || work == null || work == "") {
        work = "give me details about that.";
    }
    const info = `${data} ${work}`
    console.log("Sending data to chat API:", info);
    try {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: info
            })
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error in chat response:', error);
    }
};
export default chatresponce;