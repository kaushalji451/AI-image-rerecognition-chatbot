const imageRes = async (label : String,response : String,userid : any,imageUrl : String) => {
    console.log("imageRes saved in db:", label, response,imageUrl);
    try {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/imageresponce?id=${userid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label,
                response,
                imageUrl
            })
        });

        const responce = await res.json();
        if(responce) {
            console.log("this is res ",responce);
            return responce;
        }
    } catch (error) {
        console.error('Error in chat response:', error);
    }
};
export default imageRes;