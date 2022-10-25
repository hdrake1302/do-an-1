let editId = "";
const INPUT_TYPE = {
  TEXT: "text",
  SELECT: "select",
  NUMBER: "number",
  DATE: "date",
};

// Get input elements
const txtMaSVElement = document.querySelector("#txtMaSV");
const txtTenSVElement = document.querySelector("#txtTenSV");
const txtemailElement = document.querySelector("#txtemail");
const txtPassElement = document.querySelector("#txtPass");
const txtNgaySinhElement = document.querySelector("#txtNgaySinh");
const txtKhoaHocElement = document.querySelector("#khSV");
const txtDiemLyElement = document.querySelector("#txtDiemLy");
const txtDiemToanElement = document.querySelector("#txtDiemToan");
const txtDiemHoaElement = document.querySelector("#txtDiemHoa");

// Get table body element
const tableBodyElement = document.querySelector("#tbodySinhVien");

// Get data from local storage
const localStorageData = localStorage.getItem("listStudent");
const currentCountSVData = localStorage.getItem("currentCountSV");

let listStudent = localStorageData ? JSON.parse(localStorageData) : [];
let currentCountSV = currentCountSVData ? Number(currentCountSVData) : 1;

txtMaSVElement.value = getID(currentCountSV);

render();

// Add student on click event
const addStudentBtn = document.querySelector("#addStudentBtn");
addStudentBtn.addEventListener("click", handleAddStudent);

function handleAddStudent(event) {
  event.preventDefault();

  // // Handle Edit
  // if (editId) {
  //   const svElement = document.querySelector(`#${editId}`);

  //   // Get input fields before reset
  //   const svObj = getInputFields();

  //   if (!checkInputFields()) {
  //     return;
  //   }
  //   // update displayed element
  //   updateStudentElement(svElement, svObj);

  //   // Edit List Student
  //   updateStudent(svObj);

  //   // Update listStudent in Local Storage
  //   updateLocalStorage();

  //   // Reset all input fields to default
  //   resetInputFields();

  //   editId = "";
  //   return;
  // }

  if (editId) {
    let editStudent = listStudent.find((student) => {
      return student.id === editId
    })

    let editData = getInputFields();

    if (!checkInputFields(editData)) {
      return;
    }
    Object.assign(editStudent, editData)

    resetInputFields();
    render();

    updateLocalStorage()
    editId = "";
    return;
  }
  let isValid = checkInputFields();

  if (!isValid) return;

  clearErrorMessage();

  let newStudent = getInputFields();
  newStudent.id = getID(currentCountSV);

  addStudent(newStudent);

  updateLocalStorage();
  updateLocalStorage(currentCountSV, "currentCountSV");

  // Reset all input fields to default
  resetInputFields();

  // display new student
  const newStudentElement = buildSVTemplate(newStudent);
  tableBodyElement.appendChild(newStudentElement);
}

function buildSVTemplate(svObj) {
  const templateSV = document.querySelector("#templateSV");
  const fragmentSV = templateSV.content.cloneNode(true);
  const svElement = fragmentSV.querySelector(".SVrow");

  // update svObj data to student element
  updateStudentElement(svElement, svObj);

  const removeBtn = svElement.querySelector(".removeBtn");
  removeBtn.addEventListener("click", () => {
    tableBodyElement.removeChild(svElement);

    // Tim vi tri phan tu
    svIndex = listStudent.findIndex((currStudent) => {
      return currStudent.id === svObj.id;
    });

    if (svIndex !== -1) {
      listStudent.splice(svIndex, 1);
      updateLocalStorage(listStudent);
    }
  });

  const editBtn = svElement.querySelector(".editBtn");
  editBtn.addEventListener("click", handleEditBtn);

  function handleEditBtn() {
    clearErrorMessage();
    copyRowToInputFields();
    txtPassElement.setAttribute("readonly", "");
    addStudentBtn.innerText = "Sửa Sinh Viên";
  }

  function copyRowToInputFields() {
    editId = svObj.id;

    dataObj = getStudentElementData(svElement);
    txtMaSVElement.value = svObj.id;
    txtTenSVElement.value = dataObj.name;
    txtemailElement.value = dataObj.email;

    txtNgaySinhElement.value = dataObj.dob;
    txtKhoaHocElement.value = dataObj.course;

    txtDiemLyElement.value = dataObj.dtb;
    txtDiemToanElement.value = dataObj.dtb;
    txtDiemHoaElement.value = dataObj.dtb;
  }

  return svElement;
}

function render() {
  tableBodyElement.innerHTML = ''

  // Load data
  for (const studentObj of listStudent) {
    const svElement = buildSVTemplate(studentObj);

    // Add student to the table
    tableBodyElement.appendChild(svElement);
  }
}
function getStudentElementData(studentElement) {
  const msvElement = studentElement.querySelector(".msv");
  const tensvElement = studentElement.querySelector(".tensv");
  const emailElement = studentElement.querySelector(".email");
  const dobElement = studentElement.querySelector(".dob");
  const courseElement = studentElement.querySelector(".course");
  const dtbElement = studentElement.querySelector(".dtb");

  dataObj = {
    msv: msvElement.innerText,
    name: tensvElement.innerText,
    email: emailElement.innerText,
    dob: dobElement.innerText,
    course: courseElement.innerText,
    dtb: dtbElement.innerText,
  };

  return dataObj;
}

function updateStudentElement(studentElement, svObj) {
  studentElement.setAttribute("id", svObj.id);

  const msvElement = studentElement.querySelector(".msv");
  msvElement.innerText = svObj.id;

  const tensvElement = studentElement.querySelector(".tensv");
  tensvElement.innerText = svObj.name;

  const emailElement = studentElement.querySelector(".email");
  emailElement.innerText = svObj.email;

  const dobElement = studentElement.querySelector(".dob");
  dobElement.innerText = svObj.dob;

  const courseElement = studentElement.querySelector(".course");
  courseElement.innerText = svObj.course;

  const DTB = (svObj.math + svObj.physics + svObj.chemistry) / 3;

  const dtbElement = studentElement.querySelector(".dtb");

  dtbElement.innerText = DTB.toFixed(1);
}

function checkInputFields() {
  const arrayInputs = [
    txtTenSVElement,
    txtemailElement,
    txtNgaySinhElement,
    txtKhoaHocElement,
    txtDiemLyElement,
    txtDiemToanElement,
    txtDiemHoaElement,
  ];

  if (!editId) {
    arrayInputs.push(txtPassElement);
  }

  // Check dieu kien
  let isValid = true;

  for (input of arrayInputs) {
    const inputType = input.getAttribute("data-input-type");

    let isShowError = false;

    if (inputType === INPUT_TYPE.TEXT) {
      if (!checkTextValue(input.value)) {
        isValid = false;
        isShowError = true;
      }
    }
    if (inputType === INPUT_TYPE.NUMBER) {
      if (!checkNumberValue(input.value)) {
        isValid = false;
        isShowError = true;
      }
    }
    if (inputType === INPUT_TYPE.SELECT) {
      if (!checkSelect(input.value)) {
        isValid = false;
        isShowError = true;
      }
    }
    if (inputType === INPUT_TYPE.DATE) {
      if (!checkDate(input.value)) {
        isValid = false;
        isShowError = true;
      }
    }

    if (isShowError) {
      showErrorMessage(input);
    } else {
      clearErrorMessage(input);
    }
  }

  return isValid;
}

function checkNumberValue(number) {
  num = parseInt(number);
  return num >= 0 && num <= 10;
}

function checkTextValue(text) {
  return text.length < 8 ? false : true;
}

function checkDate(date) {
  return true;
}

function checkSelect(select) {
  return select ? true : false;
}

function showErrorMessage(input) {
  const inputLabel = input.getAttribute("data-label");

  input.nextElementSibling.style.display = "block";
  input.nextElementSibling.innerText = `${inputLabel} is not valid!`;
}

function clearErrorMessage(input) {
  if (input) {
    input.nextElementSibling.style.display = "none";
    input.nextElementSibling.innerText = "";
  } else {
    textErrors = document.querySelectorAll(".text-error");
    for (textError of textErrors) {
      textError.style.display = "none";
      textError.innerText = ``;
    }
  }
}

function getInputFields() {
  svObj = {
    id: txtMaSVElement.value,
    name: txtTenSVElement.value,
    email: txtemailElement.value,
    password: txtPassElement.value,
    dob: txtNgaySinhElement.value,
    course: txtKhoaHocElement.value,
    math: Number(txtDiemLyElement.value),
    physics: Number(txtDiemToanElement.value),
    chemistry: Number(txtDiemHoaElement.value),
  };

  return svObj;
}

function resetInputFields() {
  txtPassElement.removeAttribute("readonly");
  addStudentBtn.innerText = "Thêm Sinh Viên";

  const form = document.querySelector("#addStudentForm");
  form.reset();

  txtMaSVElement.value = getID(currentCountSV);
}

function getID(id) {
  return `MSV-${id}`;
}

function updateStudent(svObj) {
  const listIndex = listStudent.findIndex((currStudent) => {
    return currStudent.id === svObj.id;
  });

  if (listIndex !== -1) {
    listStudent.splice(listIndex, 1, svObj);
    return true;
  }

  return false;
}

function addStudent(svObj) {
  // Add new student to the list
  listStudent.push(svObj);

  // Tang msv + 1
  currentCountSV++;
}

function updateLocalStorage(data = listStudent, name = "listStudent") {
  localStorage.setItem(name, JSON.stringify(data));
}
