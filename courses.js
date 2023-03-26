let api = "http://localhost:3456/courses";
let form = document.querySelector(".form-post");
let formSubmit = document.querySelector(".form-submit");
let updateId = null;

async function addCourses({
  image,
  title,
  author,
  rating,
  bestSeller,
  price,
  buyAmount,
}) {
  try {
    await fetch(api, {
      method: "POST",
      body: JSON.stringify({
        image,
        title,
        author,
        rating,
        bestSeller,
        price,
        buyAmount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    handleErr();
  }
}

function handleErr() {
  console.log("Failed, try again");
}

let listCourses = document.querySelector(".course-list");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let courses = {
    image: this.elements["image"].value,
    title: this.elements["title"].value,
    author: this.elements["author"].value,
    rating: +this.elements["rating"].value,
    bestSeller: this.elements["bestSeller"].checked,
    price: this.elements["price"].value,
    buyAmount: +this.elements["buy"].value,
  };
  updateId
    ? await updateCoures({ id: updateId, ...courses })
    : await addCourses(courses);
  this.reset();
  await getCourses(render);
});

async function getCourses(callback) {
  try {
    let reponse = await fetch(api);
    let data = await reponse.json();
    listCourses.innerHTML = "";
    callback(data);
  } catch (error) {
    handleErr();
  }
}

async function removeData(id) {
  await fetch(api + "/" + id, {
    method: "DELETE",
  });
}
//xoá trong db

listCourses.addEventListener("click", async (e) => {
  if (e.target.closest(".course-remove")) {
    listCourses.removeChild(e.target.parentNode.parentNode);
    let removeId = +e.target.dataset.id;
    await removeData(removeId);
  } else if (e.target.closest(".course-edit")) {
    let id = +e.target.dataset.id;
    let itemData = await getSingleCourse(id);
    renderValue(itemData);
    updateId = id;
  }
});
//xóa ngoài DOM -> xóa trong db, update lai course

function renderValue(object) {
  form.elements["image"].value = object.image;
  form.elements["title"].value = object.title;
  form.elements["author"].value = object.author;
  form.elements["rating"].value = object.rating;
  form.elements["bestSeller"].checked = object.bestSeller;
  form.elements["price"].value = object.price;
  form.elements["buy"].value = object.buyAmount;
  formSubmit.textContent = "Update Course";
}

async function updateCoures({
  id,
  image,
  title,
  author,
  rating,
  bestSeller,
  price,
  buyAmount,
}) {
  let reponse = await fetch(api + "/" + id, {
    method: "PUT",
    body: JSON.stringify({
      image,
      title,
      author,
      rating,
      bestSeller,
      price,
      buyAmount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let update = await reponse.json();
  return update;
}

async function getSingleCourse(id) {
  let reponse = await fetch(api + "/" + id);
  let data = await reponse.json();
  return data;
}

function render(courses) {
  let html = courses.map((course) => {
    return `<div class="course-item">
    <div class="course-image">
      <img src="${course.image}" alt="" />
      <button class="course-remove" data-id="${course.id}">
      <i class="fa fa-times"></i>
      </button>
      <button class="course-edit" data-id="${course.id}">
      <i class="fa fa-pencil"></i>
      </button>
    </div>
    <div class="course-content">
      <h3 class="course-title">${course.title}</h3>
      <div class="course-author">${course.author}</div>
      <div class="course-meta">
        <div class="course-rating">${course.rating}</div>
        <div class="course-enroll">${course.buyAmount}</div>
      </div>
      <div class="course-best-seller">${
        course.bestSeller === true ? "Best Seller" : "Trending"
      }</div>
    </div>
  </div>`;
  });
  listCourses.innerHTML = html.join("");
}
getCourses(render);
