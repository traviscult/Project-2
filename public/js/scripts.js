// IMAGES AND MODAL SECTION for login_new.html page
// IMAGES SECTION
$(document).ready(() => {
    let addImageDivEl = document.getElementById("addImageDiv");
    addImageDivEl.addEventListener("click", displayImage);

    function getRandomImage() {
        let imagesArray = 
        [
            "url('https://user-images.githubusercontent.com/61030935/82751191-96881a00-9d83-11ea-9599-d5f6d5ebd21b.png')",
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