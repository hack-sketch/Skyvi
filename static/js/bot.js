window.onload = function() {
    const botn = document.querySelector(".bot-submit");
    const userPrompt = document.querySelector(".chatbot-input");
    let botrespo = document.querySelector(".bot-respo");

    let botfetch = () => {
        const fetchurl = "/bot";

        // Example data to be sent in the POST request
        const postData = {
            prompt: userPrompt.value,
        };

        fetch(fetchurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(postData), // Convert the data to JSON format
        })
        .then(respo => respo.json())
        .then((data) => {
            console.log(data);
            botrespo.textContent = data.response;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    botn.addEventListener("click", botfetch);
};
