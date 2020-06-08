//run only when everything is loaded in
window.onload = () => {
    //async function to account for response times
    async function sendData() {
        //grab user data
        let text = document.querySelector('.text').value;
        
        //create object with data
        let data = {text};

        //options for POST call
        let options = {
            method: 'POST',

            //without this, the server won't parse the data correctly
            body: JSON.stringify(data),

            //without this, the server will assume plaintext
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //wait for response
        let res = await fetch('/api', options);

        //get body of response
        let resStatus = await res.json();

        //console.log for debug/checking
        console.log(resStatus);
    }

    //add click listener to trigger function
    document.querySelector('.submit').addEventListener('click', () => sendData());
}