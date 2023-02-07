const { Configuration, OpenAIApi } = require("openai");

const addDalleSearch = () => {

  const imageDialog = document.getElementById("imagedialog");

  let dalleContainer = document.createElement("div");
  dalleContainer.id = "dalle40roll20Container";

  let header = document.createElement("h2");
  header.innerHTML = "DALL•E Search <span></span><span></span><span></span><span></span><span></span>";
  dalleContainer.append(header);


  let apiLabel = document.createElement("label");
  apiLabel.innerText = "API Key:";


  let apiKey = document.createElement("input");
  apiKey.type = "password";
  chrome.storage.sync.get('openAIApiKey').then(key => {
    if(apiKey.value === "" && key?.openAIApiKey?.length > 0){
      apiKey.value = key.openAIApiKey;
    }
  });
  apiLabel.append(apiKey);
  dalleContainer.append(apiLabel);


  let searchForm = document.createElement("form");
  let searchLabel = document.createElement("label");
  searchLabel.innerText = "Search:";
  let dalleSearch = document.createElement("input");
  dalleSearch.type = "text";
  searchLabel.append(dalleSearch);
  searchForm.append(searchLabel);


  let dalleNumberLabel = document.createElement("label");
  dalleNumberLabel.innerText = "Size:";
  dalleNumberLabel.classList.add("smallLabel");


  let dalleNumber = document.createElement("select");
  [1,2,3,4,5,6,7,8,9,10].map(dimension => {
    const element = document.createElement("option");
    element.value = dimension;
    element.innerText = dimension;
    dalleNumber.append(element);
  })
  dalleNumberLabel.append(dalleNumber);
  searchForm.append(dalleNumberLabel);

  let dalleSizeLabel = document.createElement("label");
  dalleSizeLabel.innerText = "Size:";
  dalleSizeLabel.classList.add("smallLabel");

  let dalleSize = document.createElement("select");
  ["256", "512", "1024"].map(dimension => {
    const element = document.createElement("option");
    element.value = dimension + "x" + dimension;
    element.innerText = dimension + "x" + dimension;
    dalleSize.append(element);
  });
  dalleSizeLabel.append(dalleSize);
  searchForm.append(dalleSizeLabel);
  
  let searchButtonContainer = document.createElement("div");
  searchButtonContainer.classList.add("clearfix");
  let searchButton = document.createElement("button");
  searchButton.classList.add("btn");
  searchButton.type = "submit";
  searchButton.innerHTML = '<span class="pictos">s</span> Search';
  searchButtonContainer.append(searchButton);
  searchForm.append(searchButtonContainer);

  dalleContainer.append(searchForm);

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let searchContainer = document.createElement("ul");
    searchContainer.classList.add("searchContainer", "loading", "clearfix");
    searchContainer.innerHTML = "Loading… <span></span><span></span><span></span><span></span><span></span>";
    searchResults.prepend(searchContainer);

    const configuration = new Configuration({
      apiKey: apiKey.value,
    });
    const openai = new OpenAIApi(configuration);
    const response = openai.createImage({
      prompt: dalleSearch.value,
      n: Number(dalleNumber.value),
      size: dalleSize.value,
    }).then(response => {

      chrome.storage.sync.set({openAIApiKey: apiKey.value});

      searchContainer.innerHTML = "";
      searchContainer.classList.remove("loading");

      response.data.data.map((generation) => {

        const name = dalleSearch.value.replace(/[^\w]+/g," ") + ".png";

        let li = document.createElement("li");

        li.addEventListener("click", () => {
          chrome.runtime.sendMessage({method: "download", options: { url: generation.url, filename: name} })
            .then(console.log);
        });

        let image = document.createElement("img");
        image.src = generation.url;
        image.classList.add("full-" + dalleSize.value)

        li.append(image);
        searchContainer.append(li);
      })

      return response;
    }).catch(err => {
        searchContainer.classList.remove("loading")
        searchContainer.classList.add("error", "alert-danger");
        console.log(err);
        searchContainer.innerHTML = `<h3>An error occured!</h3><p><strong>${err.name}</strong> ${err.message}</p>`;
    });

    return false;
  })

  const searchResults = document.createElement("div");
  dalleContainer.append(searchResults);

  imageDialog.prepend(dalleContainer);
}

const checkForSearch = setInterval(() => {
  if(document.querySelectorAll("#imagedialog").length > 0){
    try { 
      addDalleSearch();
    } catch {
    }
    clearInterval(checkForSearch);
  }
}, 250);