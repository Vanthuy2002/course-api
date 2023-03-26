//cross origin resouce sharing
let api = "https://picsum.photos/v2/list?limit=10";
async function fetchApi() {
  try {
    let reponse = await fetch(api);
    let output = await reponse.json();
    console.log(output);
  } catch (error) {
    console.log("Try again");
  }
}
fetchApi();

//======//
//same origin : -> facebook.com vs facebook.com/posts
//access-control-allow-origin: * -> cho phép mọi domain có thể truy cập

//==== REST API====//
async function postData({ title, author }) {
  try {
    let reponse = await fetch("http://localhost:3456/posts", {
      method: "POST",
      body: JSON.stringify({ title, author }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return reponse;
  } catch (error) {
    console.log("Post data failed");
  }
}

let form = document.querySelector(".form-post");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = form.querySelector("[name=title]").value;
  let author = form.querySelector("[name=author]").value;
  postData({ title, author });

  //load lai input
  form.querySelector("[name=title]").value = "";
  form.querySelector("[name=author]").value = "";
});
