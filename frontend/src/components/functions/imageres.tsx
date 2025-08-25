const imageRes = async (label : String,response : String,userid : any) => {
    console.log("imageRes saved in db:", label, response);
    try {
        let res = await fetch(`http://localhost:3000/imageresponce?id=${userid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label,
                response
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