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
    margin-top: 1.6vh
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
    showPopupBtn.textContent = 'Thêm phiếu';
    var updatePopupBtn = document.createElement('button');
    updatePopupBtn.id = 'updateProductBtn';
    updatePopupBtn.textContent = 'Sửa phiếu';
    var deletePopupBtn = document.createElement('button');
    deletePopupBtn.id = 'deleteProductBtn';
    deletePopupBtn.textContent = 'Xóa phiếu';

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
    var inputGroupDiv = document.createElement('div');
    var labelGroupDiv = document.createElement('div');

    chucVuPromise.then(cvData => {
        vatTuPromise.then(vtData => {
            // Create label group div
            labelGroupDiv.classList.add('label-group');
            var labels = ['Người yêu cầu:', 'Tên vật tư:', 'Số lượng', "Lí do:", 'Tình trạng:'];
            var index = 0;
            labels.forEach(function (labelText) {
                var label = document.createElement('label');
                index++;
                label.id = "pycLabelId" + index;
                label.textContent = labelText;
                var p = document.createElement('p');
                labelGroupDiv.appendChild(label);
                labelGroupDiv.appendChild(p);
            });

            // Create input group div
            inputGroupDiv.classList.add('input-group');
            var inputIds = ['nyc', 'tvt', 'sl', 'ld', 'tr'];
            inputIds.forEach(function (inputId) {
                if (inputId == 'tr') {
                    var label = document.createElement('label');
                    var select = document.createElement('select');
                    select.id = inputId;
                    select.classList.add('input-item');

                    tinhTrangPhieus.forEach(tinhTrang => {
                        var option1 = document.createElement('option');
                        option1.value = tinhTrang.idTinhTrangPhieu;
                        option1.textContent = tinhTrang.tenTinhTrangDuyet;
                        select.appendChild(option1);
                    });

                    // Create a paragraph for spacing
                    var p = document.createElement('p');

                    inputGroupDiv.appendChild(label);
                    inputGroupDiv.appendChild(select);
                    inputGroupDiv.appendChild(p);
                }
                else if (inputId == 'tvt') {
                    var label = document.createElement('label');
                    var select = document.createElement('select');
                    select.id = inputId;
                    select.classList.add('input-item');

                    vatus.forEach(vt => {
                        var option1 = document.createElement('option');
                        option1.value = vt.idVatTu;
                        option1.textContent = vt.tenVatTu;
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
                    input.type = 'text';

                    input.id = inputId;
                    input.classList.add('input-item');
                    var p = document.createElement('p');
                    inputGroupDiv.appendChild(input);
                    inputGroupDiv.appendChild(p);
                }

            });
        })
    })


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
    popup.appendChild(updatePopupBtn);
    popup.appendChild(deletePopupBtn);
    document.body.appendChild(overlay);

    // Add event listeners
    showPopupBtn.addEventListener('click', function () {
        var nextId = 0;
        phieuDeNghiVatTu.forEach(v => {
            if (v.idPhieuDeNghi > nextId) {
                nextId = v.idPhieuDeNghi;
            }
        })
 
        var ycData = {
            "hoTen": $("#nyc").val(),
            "idPhieuDeNghi": nextId + 1,
            "idPhieuTam": null,
            "idPhieuChinhThuc": null,
            "lyDoLapPhieu": $("#ld").val(),
            "idUser": currentUser.idUser,
            "idPhongBan": currentUser.idPhongBan,
            "idThuTruong": 8,
            "idLanhDao": 8,
            "timeTaoPhieu": "2023-11-26T13:01:06.840Z",
            "timeDuyetPhieu": "2023-11-26T13:01:06.840Z",
            "lyDoTraPhieu": "string",
            "nguoiTraPhieu": "string",
            "idTinhTrangPhieu": 1,
            "tenTinhTrangDuyet": tinhTrangDic[1]
          }

          var tvt = "";
          vatus.forEach(v => {
            if (v.idVatTu == $("#tvt").val()) {
                tvt = v.tenVatTu;
            }
        })
        var ctpData = {
            "idChiTietPhieu": 0,
            "idPhieuDeNghi": nextId + 1,
            "idTinhTrangXuLy": 1,
            "idVatTu": $("#tvt").val(),
            "tenVatTu": tvt,
            "soLuongDeNghi": $("#sl").val(),
            "soLuongThayDoi": 0,
            "donViTinhThayDoi": "string",
            "soLuongMuaThem": 0,
            "giChuThuKho": "string",
            "giChuMuaThem": "string",
            "giChuXuatVatTu": "string",
            "tongSoLuong": 0,
            "donGia": 0,
            "vat": "string",
            "thanhTien": 0,
            "idPhieuDeNghiMua": null,
            "donViCungCap": "string",
            "idHoaDon": null,
            "ghiChuSuaPhieuMua": "string",
            "ghiChuSuaTheoHoaDon": "string",
            "soLanSuaPhieuMua": 0
          }


        addProduct(ycData, ctpData);
        $('#overlay').fadeOut();
    });
    $('#addBtn').on('click', function () {
        themVatTu();
    });
    closeButton.addEventListener('click', function () {
        $('#overlay').fadeOut();
    });
})

function themVatTu() {
    $("#nyc").prop("disabled", true);
    $("#tr").prop("disabled", true);
    $("#nyc").val(currentUser.hoTen);
    $("#tvt").val("");
    $("#sl").val("");
    $("#ld").val("");
    $("#tr").val(1);

    $("#tvt").prop("disabled", false);
    $("#sl").prop("disabled", false);
    $("#ld").prop("disabled", false);

    $('#overlay').fadeIn();
    $('#popUpTitle').text("Thêm phiếu");
    $("#addProductBtn").show();
    $("#deleteProductBtn").hide();
    $("#updateProductBtn").hide();
}

function suaVatTu(data, ctpData, eventDispatcher) {
    setProductInfo(data, ctpData);
    $('#overlay').fadeIn();
    $('#popUpTitle').text("Thông tin phiếu");
    $("#addProductBtn").hide();
    $("#deleteProductBtn").show();
    $("#updateProductBtn").show();

    //set attribute
    $("#nyc").prop("disabled", true);
    // set role
    console.log(chucVuDic[currentUser.idChucVu])
    if (chucVuDic[currentUser.idChucVu] == "Nhân Viên") {
        $("#tvt").prop("disabled", false);
        $("#sl").prop("disabled", false);
        $("#ld").prop("disabled", false);
        $("#tr").prop("disabled", true);
    }
    else {
        $("#tvt").prop("disabled", true);
        $("#sl").prop("disabled", true);
        $("#ld").prop("disabled", true);
        $("#tr").prop("disabled", false);
    }

    $("#deleteProductBtn").off("click");
    $("#updateProductBtn").off("click");

    $("#deleteProductBtn").on("click", function () {
        $('#overlay').fadeOut();
        let id = data.idPhieuDeNghi;
        let ctpId = ctpData.idChiTietPhieu;
        eventDispatcher.dispatchEvent('deleteItem', {id, ctpId});
    });

    if (chucVuDic[currentUser.idChucVu] == "Nhân Viên") {
        if (data.idTinhTrangPhieu != 1) {
            $("#deleteProductBtn").hide();
            $("#updateProductBtn").hide();
            $("#tvt").prop("disabled", true);
            $("#sl").prop("disabled", true);
            $("#ld").prop("disabled", true);
            $("#tr").prop("disabled", true);
        }
        else {
            $("#deleteProductBtn").show();
            $("#updateProductBtn").show();
        }
    }
    else {
        $("#deleteProductBtn").hide();
    }


    $("#updateProductBtn").on("click", function () {
        $('#overlay').fadeOut();

        var newDataPYC = {
            idLanhDao: data.idLanhDao,
            idPhieuChinhThuc: data.idPhieuChinhThuc,
            idPhieuDeNghi: data.idPhieuDeNghi,
            idPhieuTam: data.idPhieuTam,
            idPhongBan: data.idPhongBan,
            idThuTruong: data.idThuTruong,
            idTinhTrangPhieu: $("#tr").val(),
            idUser: data.idUser,
            lyDoLapPhieu: $("#ld").val(),
            lyDoTraPhieu: data.lyDoTraPhieu,
            nguoiTraPhieu: data.nguoiTraPhieu,
            timeDuyetPhieu: data.timeDuyetPhieu,
            timeTaoPhieu: data.timeTaoPhieu
        }

        tinhTrangPhieus.forEach(t => {
            if (t.idTinhTrangPhieu == newDataPYC.idTinhTrangPhieu) {
                newDataPYC.tenTinhTrangDuyet = t.tenTinhTrangDuyet;
            }
        })

        var newDataCTP = { ...ctpData };
        newDataCTP.idVatTu = $("#tvt").val();
        vatus.forEach(v => {
            if (v.idVatTu == newDataCTP.idVatTu) {
                newDataCTP.tenVatTu = v.tenVatTu;
            }
        })
        newDataCTP.soLuongDeNghi = $("#sl").val();
        eventDispatcher.dispatchEvent('updateItem', { newDataPYC, newDataCTP });
    });
}

function setProductInfo(data, ctpData) {
    $("#nyc").val(data.hoTen);
    $("#tvt").val(ctpData.idVatTu);
    $("#sl").val(ctpData.soLuongDeNghi);
    $("#ld").val(data.lyDoLapPhieu);
    $("#tr").val(data.idTinhTrangPhieu);
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
