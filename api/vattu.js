const path = "api/VatTu/"
var tableBody;
var eventDispatcher = new EventDispatcher();
$(document).ready(function () {
    tableBody = $("#data-table-body");
    eventDispatcher.addEventListener('deleteItem', onDeleteItem);
    eventDispatcher.addEventListener('updateItem', onUpdateItem);
    eventDispatcher.addEventListener('viewItem', onViewItem);
    if (vatus.length <= 0){
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
    }
    else {
        vatus.forEach(vatTu => {
            addRowToTable(vatTu, index);
            index++;
        });
        resetIndexOnTable();
    }
    
});

function onDeleteItem(id) {
    deleteItemWithId(path, id).then((data) => {
        var child = tableBody.find('.vattudataid' + id);
        child.remove();
        showPopup("Deleted", "Item deleted");
        resetIndexOnTable();
    });
}

function onUpdateItem(data) {
    updateItemWithId(path, data.idVatTu, data).then((newData) => {
        showPopup("Update", "Item updated");

        const row = tableBody.find('.vattudataid' + data.idVatTu);

        // Update each <td> element with the new values
        row.find('td:eq(1)').text(data.tenVatTu);
        row.find('td:eq(2)').text(data.maVatTu);
        row.find('td:eq(3)').text(data.soLuongTonKho);
        row.find('td:eq(4)').text(data.donViTinh);
        row.find('td:eq(5)').text(data.viTri);
        row.find('td:eq(6)').text(data.ghiChu);

        // Update the image source based on the condition you provided
        const imagePath = (data.hinhAnhVatTu !== " " && data.hinhAnhVatTu !== "string" && data.hinhAnhVatTu !== "") ?
        data.hinhAnhVatTu : '../resources/defaultAvatar.png';
        row.find('td:eq(7) img').attr('src', imagePath);
    });
}

function onViewItem(id) {
    for (let index = 0; index < vatus.length; index++) {
        if (vatus[index].idVatTu == id) {
            suaVatTu(vatus[index], eventDispatcher);
            break;
        }
    }
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
        <td><img src = ${(data.hinhAnhVatTu != " " && data.hinhAnhVatTu != "string" && data.hinhAnhVatTu != "") ? data.hinhAnhVatTu : '../resources/defaultAvatar.png'} class="avt"/></td>
        <td><button class="delete-button" data-id="${data.idVatTu}">Chi tiết</button></td>
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
            eventDispatcher.dispatchEvent('viewItem', id);
        });
    });
}

function addProduct(productData) {
    postData(path, productData).then((data) => {
        vatus.push(data);
        showPopup("Added", "Item added")
        addRowToTable(productData, vatus.length);
        resetIndexOnTable();

        // $('.delete-button').on('click', function () {
        //     eventDispatcher.dispatchEvent('deleteItem', data.idVatTu);
        // });
    })
}