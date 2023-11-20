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

#addProductBtn {
  background-color: #07b007;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 auto
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

.label-group {
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
    showPopupBtn.textContent = 'Thêm vật tư';

    // Create overlay element
    var overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Create popup element
    var popup = document.createElement('div');
    popup.id = 'popup';

    // Create h2 element
    var h2 = document.createElement('h2');
    h2.textContent = 'Thêm vật tư';

    // Create div.center element
    var centerDiv = document.createElement('div');
    centerDiv.classList.add('center');

    // Create label group div
    var labelGroupDiv = document.createElement('div');
    labelGroupDiv.classList.add('label-group');
    var labels = ['Tên vật tư:', 'Mã vật tư:', 'Vị trí', 'Số tồn kho:', 'Đơn vị tính:', 'Hình ảnh', 'Ghi chú:'];
    labels.forEach(function (labelText) {
        var label = document.createElement('label');
        label.textContent = labelText;
        var p = document.createElement('p');
        labelGroupDiv.appendChild(label);
        labelGroupDiv.appendChild(p);
    });

    // Create input group div
    var inputGroupDiv = document.createElement('div');
    inputGroupDiv.classList.add('input-group');
    var inputIds = ['tvt', 'mvt', 'vt', 'stk', 'dvt', 'ha', 'gc'];
    inputIds.forEach(function (inputId) {
        if (inputId == 'dvt') {
            var label = document.createElement('label');
            var select = document.createElement('select');
            select.id = inputId;
            select.classList.add('input-item');

            // Add options to the select element (you can customize this part)
            var option1 = document.createElement('option');
            option1.value = 'cai';
            option1.textContent = 'Cái';
            select.appendChild(option1);

            var option2 = document.createElement('option');
            option2.value = 'thung';
            option2.textContent = 'Thùng';
            select.appendChild(option2);

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



    // Create close button
    var closeButton = document.createElement('button');
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
    document.body.appendChild(overlay);

    // Add event listeners
    showPopupBtn.addEventListener('click', function () {
        var nextId = 0;
        vatus.forEach(v => {
            if (v.idVatTu > nextId) {
                nextId = v.idVatTu;
            }
        })
        console.log(imgDataUrl)
        var data = {
            "idVatTu": nextId + 1,
            "tenVatTu": $("#tvt").val(),
            "maVatTu": $("#mvt").val(),
            "donViTinh": $("#dvt").val(),
            "soLuongTonKho": parseInt($("#stk").val()),
            "idKho": null,
            "viTri": $("#vt").val(),
            "ghiChu": $("#gc").val(),
            "hinhAnhVatTu": imgDataUrl,
            "imger": null
        }

        addProduct(data);
        $('#overlay').fadeOut();
    });
    $('#addBtn').on('click', function () {
        $('#overlay').fadeIn();
    });
    closeButton.addEventListener('click', function () {
        $('#overlay').fadeOut();
    });
})

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
