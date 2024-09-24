const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 1;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("is-active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("is-active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("is-hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("is-hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});

// modal
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const stop = false;

function closeModal() {
  modal.classList.toggle("show-modal");
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//slider instagram
let currentIndex = 0;
let slides = document.getElementsByClassName("instagram-slide");
let totalSlides = slides.length - 1;
let visibleSlides = 3; // Количество отображаемых слайдов одновременно

function changeSlide(direction) {
  // Проверяем, чтобы не выйти за пределы доступных слайдов
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

  // Обновляем положение слайдов
  let offset = -(currentIndex * (100 / visibleSlides));
  document.querySelector(
    ".instagram-slider"
  ).style.transform = `translateX(${offset}%)`;
}

//slider partner
const slidesPartner = document.querySelectorAll(".partner-slider-group");
const paginationNumbersPartner = document.getElementById(
  "partner-pagination-numbers"
);
let pagePartner = 0;
const totalSlidesPartner = slidesPartner.length - 1;

function changeSlidePartner(direction) {
  // Скрываем текущий слайд
  slidesPartner[pagePartner].style.display = "none";

  // Обновляем индекс текущего слайда
  pagePartner += direction;

  // Проверяем, чтобы не выйти за пределы слайдов
  if (pagePartner > totalSlidesPartner) {
    pagePartner = 0; // Возвращаемся на первый слайд
  } else if (pagePartner < 0) {
    pagePartner = totalSlidesPartner; // Переходим на последний слайд
  }

  handleActivePageNumberPartner();
  // Показываем новый слайд
  slidesPartner[pagePartner].style.display = "flex";
}

const appendPageNumberPartner = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "partner-pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbersPartner.appendChild(pageNumber);
};

const getPaginationNumbersPartner = () => {
  for (let i = 1; i <= totalSlidesPartner + 1; i++) {
    appendPageNumberPartner(i);
  }
};

function handleActivePageNumberPartner() {
  document.querySelectorAll(".partner-pagination-number").forEach((button) => {
    button.classList.remove("is-active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == pagePartner+1) {
      button.classList.add("is-active");
    }
  });
}

getPaginationNumbersPartner();

//input file
function uploadFile(target) {
  document.getElementById("file-name").innerHTML = target.files[0].name;
}

//scrollOnVacancy
document.querySelectorAll('a[href^="#"').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    let href = this.getAttribute("href").substring(1);

    const scrollTarget = document.getElementById(href);
    const header = document.getElementById("myHeader");
    let topOffset;
    if (header.classList.contains("sticky")) {
      topOffset = document.querySelector(".scrollto").offsetHeight;
    } else {
      topOffset = 150;
    }
    //const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});
//form

const modal_input = document.getElementsByClassName("modal-input");
// console.log(modal_input);
// modal_input.onchange = console.log(modal_input.value);

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form");
//   form.addEventListener("submit", formSend);

//   async function formSend(e) {
//     e.preventDefault();

//     let error = formValidate(form);

//     let formDate = new FormData(form);
//     formDate.append("file", formFile.files[0]);
//     if (error === 0) {
//       form.classList.add("_sending");
//       // let response = await fetch('sendmail.php',{

//       //   method:"POST",
//       //   body:formDate
//       // })
//       if (response.ok) {
//         let result = await response.json();
//         form.reset();
//         form.classList.remove("_sending");
//       } else {
//         form.classList.remove("_sending");
//       }
//     }
//   }

//   function changeValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll("._req");

//     for (let index = 0; index < formReq.length; index++) {
//       const input = formReq[index];
//       formRemoveError(input);

//       if (input.classList.contains("phone")) {
//         if (emailTest(input)) {
//           formAddError(input);
//           error++;
//         }
//       } else if (
//         input.getAttribute("type") === "checkbox" &&
//         input.checked === false
//       ) {
//         formAddError(input);
//         error++;
//       } else {
//         if (input.value === "") {
//           formAddError(input);
//           error++;
//         }
//       }
//     }
//     return error;
//   }
//   function formValidate(form) {
//     let error = 0;
//     let formReq = document.querySelectorAll("._req");
//     form.addEventListener("click", changeValidate);
//     for (let index = 0; index < formReq.length; index++) {
//       const input = formReq[index];
//       formRemoveError(input);

//       if (input.classList.contains("phone")) {
//         if (emailTest(input)) {
//           formAddError(input);
//           error++;
//         }
//       } else if (
//         input.getAttribute("type") === "checkbox" &&
//         input.checked === false
//       ) {
//         formAddError(input);
//         error++;
//       } else {
//         if (input.value === "") {
//           formAddError(input);
//           error++;
//         }
//       }
//     }
//     return error;
//   }

function formAddError(input) {
  input.parentElement.classList.add("is-error");
  input.classList.add("is-error");
}

function formRemoveError(input) {
  input.parentElement.classList.remove("is-error");
  input.classList.remove("is-error");
}

//   function emailTest(input) {
//     console.log(input);
//     return "".test(input.value);
//   }

//   // function emailTest(input) {
//   //   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//   // }

//   // const formFile = document.getElementById("file");
//   // formFile.addEventListener("change", () => {
//   //   formFile.files[0];
//   // });
// });
