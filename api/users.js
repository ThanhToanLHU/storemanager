const userPath = "api/Users/"
var userTableBody;
var userEventDispatcher = new EventDispatcher();
$(document).ready(function () {
    chucVuPromise.then(chucvuData => {
        userTableBody = $("#data-table-body");
        userEventDispatcher.addEventListener('deleteItem', onDeleteItem);
        userEventDispatcher.addEventListener('updateItem', onUpdateItem);
        userEventDispatcher.addEventListener('viewItem', onViewItem);
        if (users.length <= 0) {
            getAllData(userPath).then((data) => {
                console.log(data);
                users = data;
                var index = 1;
                users.forEach(user => {
                    addRowToTable(user, index);
                    index++;
                });
    
                resetIndexOnTable();
            });
        }
        else {
            users.forEach(user => {
                addRowToTable(user, index);
                index++;
            });
            resetIndexOnTable();
        }
    });
});

function onDeleteItem(id) {
    deleteItemWithId(userPath, id).then((data) => {
        var child = userTableBody.find('.vattudataid' + id);
        child.remove();
        showPopup("Deleted", "Item deleted");
        resetIndexOnTable();
    }).catch(e => {
        console.log("aa" + e)
    });
}

function onUpdateItem(data) {
    updateItemWithId(userPath, data.idUser, data).then((newData) => {
        showPopup("Update", "Item updated");

        const row = userTableBody.find('.vattudataid' + data.idUser);

        // Update each <td> element with the new values
        row.find('td:eq(1)').text(data.hoTen);
        row.find('td:eq(2)').text(data.tenChucVu);
        row.find('td:eq(3)').text(data.tenPhongBan);
        row.find('td:eq(4)').text(data.dienThoai);
        row.find('td:eq(5)').text(data.email);
        row.find('td:eq(6)').text(data.diaChi);

        // Update the image source based on the condition you provided
        const imagePath = (data.hinhDaiDien !== " " && data.hinhDaiDien !== "string" && data.hinhDaiDien !== "") ?
            data.hinhDaiDien : '../resources/defaultAvatar.png';
        row.find('td:eq(7) img').attr('src', imagePath);

        for (let index = 0; index < users.length; index++) {
            if (users[index].idUser == data.idUser) {
                users[index] = data;
                break;
            }
        }
    });
}

function onViewItem(id) {
    for (let index = 0; index < users.length; index++) {
        if (users[index].idUser == id) {
            suaVatTu(users[index], userEventDispatcher);
            break;
        }
    }
}

function addRowToTable(data, index) {
    var row = `
        <tr class = 'vattudataid${data.idUser}'>
            <td>${index}</td>
            <td>${data.hoTen}</td>
            <td>${chucVuDic[data.idChucVu]}</td>
            <td>${phongBanDic[data.idPhongBan]}</td>
            <td>${data.dienThoai}</td>
            <td>${data.email}</td>
            <td>${data.diaChi}</td>
            <td><img src = ${(data.hinhDaiDien != " " && data.hinhDaiDien != null && data.hinhAnhVatTu != "") ? data.hinhDaiDien : '../resources/defaultAvatar.png'} class="avt"/></td>
            <td><button class="delete-button" data-id="${data.idUser}">Chi tiết</button></td>
        </tr>
    `;

    userTableBody.append(row);
}

function resetIndexOnTable() {
    $('#data-table-body tr').each(function (i) {
        $(this).find('td:first').text(i + 1);
    });

    $('#data-table-body tr td:last-child button.delete-button').each(function () {
        var id = $(this).data('id');
        $(this).off('click');
        $(this).on('click', function () {
            userEventDispatcher.dispatchEvent('viewItem', id);
        });
    });
}

function addProduct(productData) {
    postData(userPath, productData).then((data) => {
        users.push(data);
        showPopup("Added", "Item added")
        addRowToTable(productData, users.length);
        resetIndexOnTable();

        // $('.delete-button').on('click', function () {
        //     eventDispatcher.dispatchEvent('deleteItem', data.idVatTu);
        // });
    })
}