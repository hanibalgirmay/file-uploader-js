const form = document.querySelector("form");
fileInput = document.querySelector(".file-input");
progressArea = document.querySelector(".progress-area");
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onChange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let filename = file.name;
    if (filename.length >= 12) {
      let splitName = filename.split(".");
      filename = splitName[0].substring(0, 13) + "..." + "." + splitName[1];
    }
    uploadFile(filename);
  }
};

uploadFile = (filename) => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php", true);
  xhr.upload.adaddEventListener("progress", (loaded, total) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1024);

    let fileSize =
      fileTotal < 1024
        ? fileTotal + " KB"
        : (fileTotal / 1024).toFixed(2) + " MB";
    let progressHtml = `<li class="row">
                                <i class="fas fa-file-alt></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${name} .  Uloading</span>
                                        <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width:${fileLoaded0}%"></div>
                                    </div>
                                </div>
                            </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHtml;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
};
