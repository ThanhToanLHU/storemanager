const path = "api/VatTu/"
var vatus = [];
var tableBody;
var eventDispatcher = new EventDispatcher();
$(document).ready(function () {
    tableBody = $("#data-table-body");
    eventDispatcher.addEventListener('deleteItem', onDeleteItem);
    getAllData(path).then((data) => {
        console.log(data);
        vatus = data;
        var index = 1;
        vatus.forEach(vatTu => {
            addRowToTable(vatTu, index);
            index++;
        });

        resetIndexOnTable();
    });
});

function onDeleteItem(id) {
    deleteItemWithId(path, id).then((data) => {
        var child = tableBody.find('.vattudataid' + id);
        child.remove();
        showPopup("Deleted", "Item deleted");
        resetIndexOnTable();
    });
}

function addRowToTable(data, index) {
    var row = `
    <tr class = 'vattudataid${data.idVatTu}'>
        <td>${index}</td>
        <td>${data.tenVatTu}</td>
        <td>${data.maVatTu}</td>
        <td>${data.soLuongTonKho}</td>
        <td>${data.donViTinh}</td>
        <td>${data.viTri}</td>
        <td>${data.ghiChu}</td>
        <td><img src = ${(data.hinhAnhVatTu != " " && data.hinhAnhVatTu != "string" && data.hinhAnhVatTu != "") ? data.hinhAnhVatTu: '../resources/defaultAvatar.png'} class="avt"/></td>
        <td><button class="delete-button" data-id="${data.idVatTu}">Delete</button></td>
    </tr>
`;

    tableBody.append(row);
}

function resetIndexOnTable() {
    $('#data-table-body tr').each(function (i) {
        $(this).find('td:first').text(i + 1);
    });

    $('#data-table-body tr td:last-child button.delete-button').each(function () {
        var id = $(this).data('id');
        $(this).off('click'); 
        $(this).on('click', function () {
          eventDispatcher.dispatchEvent('deleteItem', id);
        });
      });
}

function addProduct(productData) {
    postData(path, productData).then((data) => {
        vatus.push(data);
        showPopup("Added", "Item added")
        addRowToTable(data, vatus.length);
        resetIndexOnTable();

        // $('.delete-button').on('click', function () {
        //     eventDispatcher.dispatchEvent('deleteItem', data.idVatTu);
        // });
    })
}