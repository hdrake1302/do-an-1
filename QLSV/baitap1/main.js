const showDataBtn = document.querySelector('#showDataBtn');

// target
const targetMaSV = document.querySelector('#spanMaSV');
const targetTenSV = document.querySelector('#spanTenSV');
const targetLoaiSV = document.querySelector('#spanLoaiSV');
const targetXepLoaiSV = document.querySelector('#spanXepLoai');
const targetDTB = document.querySelector('#spanDTB');

// Source
const maSvElement = document.querySelector('#txtMaSV');
const tenSvElement = document.querySelector('#txtTenSV');
const loaiSvElement = document.querySelector('#loaiSV');
const diemToanElement = document.querySelector('#txtDiemToan');
const diemVanElement = document.querySelector('#txtDiemVan');

function handleShowData() {

    const maSvValue = maSvElement.value;
    const tenSvValue = tenSvElement.value;
    const loaiSvValue = loaiSvElement.value;
    const diemToanValue = diemToanElement.value;
    const diemVanValue = diemVanElement.value;

    let isValid = true;

    const inputArr = [maSvElement, tenSvElement, diemToanElement, diemVanElement];
    for (const input of inputArr) {
        if (!input.value) {
            const inputName = input.getAttribute('data-name');
            input.nextElementSibling.innerText = 'Vui lòng không để trống ' + inputName;
            input.nextElementSibling.style.display = 'block';
            isValid = false;
        }
        else {
            input.nextElementSibling.style.display = 'none';
        }
    }
    if (!isValid) return;




    // check DK
    // if (!maSvValue) {
    //     maSvElement.nextElementSibling.innerText = '*** Vui long nhap thong tin ***';
    //     maSvElement.nextElementSibling.style.display = 'block';
    //     isValid = false;
    // }
    // if (!tenSvValue) {
    //     tenSvElement.nextElementSibling.innerText = '*** Vui long nhap thong tin ***';
    //     tenSvElement.nextElementSibling.style.display = 'block';
    //     isValid = false;
    // }
    // if (!diemToanValue) {
    //     diemToanElement.nextElementSibling.innerText = '*** Vui long nhap thong tin ***';
    //     diemToanElement.nextElementSibling.style.display = 'block';
    //     isValid = false;
    // }
    // if (!diemVanValue) {
    //     diemVanElement.nextElementSibling.innerText = '*** Vui long nhap thong tin ***';
    //     diemVanElement.nextElementSibling.style.display = 'block';
    //     isValid = false;
    // }







    targetTenSV.innerText = tenSvValue;
    targetLoaiSV.innerText = loaiSvValue;
    targetMaSV.innerText = maSvValue;

    const DTB = (Number(diemToanValue) + Number(diemVanValue)) / 2;
    targetDTB.innerText = DTB;

    let xepLoai = '';
    if (DTB <= 4) {
        xepLoai = 'Yeu';
    } else if (DTB <= 6 && DTB >= 4) {
        xepLoai = 'TB';
    } else if (DTB <= 9 && DTB >= 6) {
        xepLoai = 'Kha';
    } else {
        xepLoai = 'Gioi';
    }
    targetXepLoaiSV.innerText = xepLoai;

    // if (loaiSvValue == '1') {
    //     targetLoaiSV.innerText = 'Ngheo';
    // } else if (loaiSvValue == '2') {
    //     targetLoaiSV.innerText = 'Giau';
    // } else targetLoaiSV.innerText = 'Binh Thuong';

    // switch case
    let loaiSV = '';
    switch (loaiSvValue) {
        case '1': {
            loaiSV = 'Ngheo';
            break;
        }
        case '2': {
            loaiSV = 'Giau';
            break;
        }
        case '3': {
            loaiSV = 'Binh Thuong';
            break;
        }
        default: {
            loaiSV = 'Khum Bik';
            break;
        }
    }
    targetLoaiSV.innerText = loaiSV;



}
showDataBtn.addEventListener('click', handleShowData);

