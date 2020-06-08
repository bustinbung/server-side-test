//run only when everything is loaded in
window.onload = () => {
    //call function immediately, we don't need to wait for user input
    getData();
    async function getData() {
        //GET call to the server
        const res = await fetch('/api');

        //data is equal to the body of the response
        const data = await res.json();

        //create div with each item and append to body
        for (item of data) {
            const root = document.createElement('div');
            const text = document.createElement('div');
            const time = document.createElement('div');

            //using textContent over innerHTML to avoid malicious code
            text.textContent = item.text;
            time.textContent = new Date(item.timestamp).toLocaleString();
            
            root.append(text, time);
            document.body.append(root);
        }
    }
}