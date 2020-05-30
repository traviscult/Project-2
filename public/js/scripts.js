// IMAGES SECTION

$(document).ready(() => {
  let addImageDivEl = document.getElementById("addImageDiv");
  addImageDivEl.addEventListener("click", displayImage);

  function getRandomImage() {
    let imagesArray = ["url('https://user-images.githubusercontent.com/61030935/82751191-96881a00-9d83-11ea-9599-d5f6d5ebd21b.png')",

      "url('https://user-images.githubusercontent.com/61030935/82751192-96881a00-9d83-11ea-96c0-7693d03a4002.png')",

      "url('https://user-images.githubusercontent.com/61030935/82751193-9720b080-9d83-11ea-93cf-c2b3060c03b7.png')",

      "url('https://user-images.githubusercontent.com/61030935/82751190-96881a00-9d83-11ea-8dbe-6532cc8d023d.png')",

      "url('https://user-images.githubusercontent.com/61030935/82751189-95ef8380-9d83-11ea-874e-82a135955b0c.png')"
    ];

    let randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    return randomImage;
  };

  function displayImage() {
    document.body.style.backgroundImage = getRandomImage();
  };
  displayImage();

});


// MODAL SECTION
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
// EXS 29th May 2020 - Removed these 2 clicks as they're not terribly important to the actual login/signup process

btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}