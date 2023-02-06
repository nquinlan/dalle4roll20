console.log("HELLO HACKERS!!");
const { Configuration, OpenAIApi } = require("openai");

const addDalleSearch = () => {
  console.log("DALLE WAS FOUND");

  const imageDialog = document.getElementById("imagedialog");

  let dalleContainer = document.createElement("div");
  dalleContainer.id = "dalleContainer";

  let header = document.createElement("h2");
  header.innerText = "DALL•E Search";
  dalleContainer.append(header);


  let apiLabel = document.createElement("label");
  apiLabel.innerText = "API Key:";


  let apiKey = document.createElement("input");
  apiKey.type = "password";
  apiLabel.append(apiKey);
  dalleContainer.append(apiLabel);


  let searchForm = document.createElement("form");

  let searchLabel = document.createElement("label");
  searchLabel.innerText = "Search:";


  let dalleSearch = document.createElement("input");
  dalleSearch.type = "text";

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: apiKey.value,
    });
    const openai = new OpenAIApi(configuration);
    const response = openai.createImage({
      prompt: dalleSearch.value,
      n: 6,
      size: "256x256",
    }).then((response) => {

      let searchContainer = document.createElement("ul");

      response.data.data.map((generation) => {

        console.log(generation.url);

        let li = document.createElement("li");

        let image = document.createElement("img");
        image.src = generation.url;

        li.append(image);
        searchContainer.append(li);
      })

      dalleContainer.append(searchContainer);

    });

    return false;
  })

  searchLabel.append(dalleSearch);
  searchForm.append(searchLabel);
  dalleContainer.append(searchForm);


  imageDialog.prepend(dalleContainer);
}

const checkForSearch = setInterval(() => {
  if(document.querySelectorAll("#imagedialog").length > 0){
    addDalleSearch();
    clearInterval(checkForSearch);
  }
}, 250);