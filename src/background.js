const blobToDataUrl = (blob) => {
  return new Promise(r => {let a=new FileReader(); a.onload=r; a.readAsDataURL(blob)}).then(e => e.target.result);
}

const getFileUrlFromUrl = (options) => {
  return fetch(options.url)
    .then(response => response.blob())
    .then(imageBlob => {
        // Then create a local URL for that image and print it 
      const reader = new FileReader();
      return blobToDataUrl(imageBlob);
    });
}

const download = (options) => {
  return chrome.downloads.download({
    url: options.url,
    filename: options.filename
  });
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(chrome.runtime.id !== sender.id)
        return false

    if (request.method === "getFileUrlFromUrl") {
      getFileUrlFromUrl(request.options).then((next) => {
        console.log(next);
        sendResponse(next);
      })
    }

    if (request.method === "download") {
      download(request.options).then((next) => {
        console.log(next);
        sendResponse(next);
      })
    }

  }
);