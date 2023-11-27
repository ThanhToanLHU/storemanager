var imgDataUrl = ""
$(document).ready(function () {
    var styles = `

/* Styles for the overlay */
#overlay {
  display: none;
  position: fixed;
  top: 10vh;
  left: 30vw;
  width: 50vw;
  height: 100%;
  background: #fff;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1000;
  border-radius: 8px;
}

/* Styles for the popup */
#popup {
  background: #2F356D;
  padding: 100px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 10);
  color: #fff;
}

/* Close button styles */
#closeAddProductBtn {
  background-color: red;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 0px;
  right: 0px
}

#addProductBtn, #updateProductBtn, #deleteProductBtn {
  background-color: #07b007;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px,

}

#updateProductBtn{
    background-color: #abc00c;
    margin-right: 10px
}

#deleteProductBtn{
    background-color: #c0164a
}

h2 {
  color: #fff;
  text-align: center;
}

.center {
  display: flex;
  text-align: center;
  gap: 20px;
  margin-left: 5vw;
}

.input-item {
  height: 18px;
  width: 100%;
  margin-top: 2%;
  color: black
}

input[type=file]{
    margin-top: 2vh
}


.label-text {
    height: 18px;
    margin-top: 0.5vh
}

.input-group {
    width: 60%
}
`;

    // Create a style element and append it to the head
    var styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Create button element
    var showPopupBtn = document.createElement('button');
    showPopupBtn.id = 'addProductBtn';
    showPopupBtn.textContent = 'Thêm người dùng';
    var updatePopupBtn = document.createElement('button');
    updatePopupBtn.id = 'updateProductBtn';
    updatePopupBtn.textContent = 'Sửa người dùng';
    var deletePopupBtn = document.createElement('button');
    deletePopupBtn.id = 'deleteProductBtn';
    deletePopupBtn.textContent = 'Xóa người dùng';

    // Create overlay element
    var overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Create popup element
    var popup = document.createElement('div');
    popup.id = 'popup';

    // Create h2 element
    var h2 = document.createElement('h2');
    h2.id = "popUpTitle";
    h2.textContent = 'Thêm vật tư';

    // Create div.center element
    var centerDiv = document.createElement('div');
    centerDiv.classList.add('center');

    // Create label group div
    var labelGroupDiv = document.createElement('div');
    labelGroupDiv.classList.add('label-group');
    var labels = ['Tên người dùng:', 'Tên đăng nhập:', 'Mật khẩu:', 'Chức vụ:', 'Phòng ban:', 'Số điện thoại:', 'Email', 'Địa chỉ:', 'Ảnh đại diện'];
    labels.forEach(function (labelText) {
        var label = document.createElement('label');
        label.classList.add('label-text');
        label.textContent = labelText;
        var p = document.createElement('p');
        labelGroupDiv.appendChild(label);
        labelGroupDiv.appendChild(p);
    });

    // Create close button
    var closeButton = document.createElement('button');

    chucVuPromise.then(data => {
        // Create input group div
        var inputGroupDiv = document.createElement('div');
        inputGroupDiv.classList.add('input-group');
        var inputIds = ['hvt', 'un', 'pw', 'cv', 'pb', 'sdt', 'em', 'dc', 'ha'];
        inputIds.forEach(function (inputId) {
            if (inputId == 'cv') {
                var label = document.createElement('label');
                var select = document.createElement('select');
                select.id = inputId;
                select.classList.add('input-item');

                chucvus.forEach(chucVu => {
                    var option1 = document.createElement('option');
                    option1.value = chucVu.idChucVu;
                    option1.textContent = chucVu.tenChucVu;
                    select.appendChild(option1);
                });

                // Create a paragraph for spacing
                var p = document.createElement('p');

                inputGroupDiv.appendChild(label);
                inputGroupDiv.appendChild(select);
                inputGroupDiv.appendChild(p);
            }
            else if (inputId == 'pb') {
                var label = document.createElement('label');
                var select = document.createElement('select');
                select.id = inputId;
                select.classList.add('input-item');

                phongBan.forEach(phongBan => {
                    var option1 = document.createElement('option');
                    option1.value = phongBan.idPhongBan;
                    option1.textContent = phongBan.tenPhongBan;
                    select.appendChild(option1);
                });

                // Create a paragraph for spacing
                var p = document.createElement('p');

                inputGroupDiv.appendChild(label);
                inputGroupDiv.appendChild(select);
                inputGroupDiv.appendChild(p);
            }
            else {
                var input = document.createElement('input');
                if (inputId == 'ha') {
                    input.type = 'file';
                    input.addEventListener('change', function (event) {
                        handleFileInputChange(event);
                    });
                }
                else {
                    input.type = 'text';
                }
                input.id = inputId;
                input.classList.add('input-item');
                var p = document.createElement('p');
                inputGroupDiv.appendChild(input);
                inputGroupDiv.appendChild(p);
            }

        });

        closeButton.id = 'closeAddProductBtn';
        closeButton.textContent = 'Đóng';

        // Append elements to the document
        centerDiv.appendChild(labelGroupDiv);
        centerDiv.appendChild(inputGroupDiv);
        popup.appendChild(h2);
        popup.appendChild(centerDiv);
        popup.appendChild(document.createElement('p')); // Empty paragraph
        popup.appendChild(closeButton);
        overlay.appendChild(popup);
        popup.appendChild(showPopupBtn);
        popup.appendChild(updatePopupBtn);
        popup.appendChild(deletePopupBtn);
        document.body.appendChild(overlay);
    });


    // Add event listeners
    showPopupBtn.addEventListener('click', function () {
        var nextId = 0;
        users.forEach(v => {
            if (v.idUser > nextId) {
                nextId = v.idUser;
            }
        })
        var data = {
            "idUser": nextId + 1,
            "hoTen": $("#hvt").val(),
            "username": $("#un").val(),
            "matKhau": $("#pw").val(),
            "maBiMat": null,
            "idChucVu": parseInt($("#cv").val()),
            "idPhongBan": parseInt($("#pb").val()),
            "diaChi": $("#dc").val(),
            "email": $("#em").val(),
            "dienThoai": $("#sdt").val(),
            "hinhDaiDien": imgDataUrl,
            "img": null
        }
        console.log(data)

        addProduct(data);
        $('#overlay').fadeOut();
    });
    if (currentUser.idChucVu == 5) {
        $('#addBtn').hide();
    }
    $('#addBtn').on('click', function () {
        themVatTu();
    });
    closeButton.addEventListener('click', function () {
        $('#overlay').fadeOut();
    });
})

function themVatTu() {
    $("#hvt").val("");
    $("#un").val("");
    $("#pw").val("");
    $("#cv").val("");
    $("#pb").val("");
    $("#dc").val("");
    $("#em").val("");
    $("#sdt").val("");
    imgDataUrl = "";

    $('#overlay').fadeIn();
    $('#popUpTitle').text("Thêm người dùng");
    $("#addProductBtn").show();
    $("#deleteProductBtn").hide();
    $("#updateProductBtn").hide();
}

function suaVatTu(data, eventDispatcher) {
    setProductInfo(data);
    $('#overlay').fadeIn();
    $('#popUpTitle').text("Thông tin người dùng");
    $("#addProductBtn").hide();
    $("#deleteProductBtn").show();
    $("#updateProductBtn").show();

    if (currentUser.idChucVu == 5) {
        $("#deleteProductBtn").hide();
    }

    $("#deleteProductBtn").off("click");
    $("#updateProductBtn").off("click");

    $("#deleteProductBtn").on("click", function () {
        $('#overlay').fadeOut();
        eventDispatcher.dispatchEvent('deleteItem', data.idUser);
    });

    $("#updateProductBtn").on("click", function () {
        $('#overlay').fadeOut();
        var newData = {
            "idUser": data.idUser,
            "hoTen": $("#hvt").val(),
            "username": $("#un").val(),
            "matKhau": $("#pw").val(),
            "maBiMat": null,
            "idChucVu": parseInt($("#cv").val()),
            "idPhongBan": parseInt($("#pb").val()),
            "diaChi": $("#dc").val(),
            "email": $("#em").val(),
            "dienThoai": $("#sdt").val(),
            "hinhDaiDien": imgDataUrl,
            "img": null
        }
        console.log(newData)
        eventDispatcher.dispatchEvent('updateItem', newData);
    });
}

function setProductInfo(data) {
    $("#hvt").val(data.hoTen);
    $("#un").val(data.username);
    $("#pw").val(data.matKhau);
    $("#cv").val(parseInt(data.idChucVu));
    $("#pb").val(parseInt(data.idPhongBan));
    $("#dc").val(data.diaChi);
    $("#em").val(data.email);
    $("#sdt").val(data.dienThoai);

    imgDataUrl = data.hinhDaiDien;
}

function handleFileInputChange(event) {
    var fileInput = event.target;
    var file = fileInput.files[0];

    if (file) {
        convertFileToDataURL(file, (dataurl) => {
            imgDataUrl = dataurl;
        })
    } else {
        console.error('No file selected.');
    }
}

function convertFileToDataURL(file, callback) {
    var reader = new FileReader();

    reader.onloadend = function () {
        callback(reader.result);
    };

    reader.readAsDataURL(file);
}
