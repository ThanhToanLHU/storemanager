var tableBody;
var eventDispatcher = new EventDispatcher();

function canDisplay(phieu){
    if (currentUser.idChucVu == 5) {
        if (currentUser.idUser == phieu.idUser){
            return true;
        }
    }
    else {
        if (currentUser.idPhongBan == 3){
            return true;
        }
        if (currentUser.idPhongBan == phieu.idPhongBan){
            return true;
        }
    }

    return false;
}

$(document).ready(function () {
    initDone.then(() => {
        tableBody = $("#data-table-body");
        eventDispatcher.addEventListener('deleteItem', onDeleteItem);
        eventDispatcher.addEventListener('updateItem', onUpdateItem);
        eventDispatcher.addEventListener('viewItem', onViewItem);
        var index = 1;

        if (phieuDeNghiVatTu.length <= 0) {
            getAllData(pdnvtPath).then((data) => {
                console.log(data);
                phieuDeNghiVatTu = data;
                phieuDeNghiVatTu.forEach(phieu => {
                    if (canDisplay(phieu)) {
                        addRowToTable(phieu, index);
                        index++;
                    }

                });

                setTimeout(() => {
                    resetIndexOnTable();
                }, 500);
            });
        }
        else {
            console.log(phieuDeNghiVatTu)
            phieuDeNghiVatTu.forEach(phieu => {
                if (canDisplay(phieu)) {
                    addRowToTable(phieu, index);
                    index++;
                }

            });
            setTimeout(() => {
                resetIndexOnTable();
            }, 500);
        }
    })
});

function onDeleteItem(idData) {
    var id = idData.id;
    var ctpId = idData.ctpId;
    deleteItemWithId(ctpPath, ctpId).then(() => {
        deleteItemWithId(pdnvtPath, id).then(() => {
            var child = tableBody.find('.vattudataid' + id);
            child.remove();
            showPopup("Deleted", "Item deleted");
            setTimeout(() => {
                resetIndexOnTable();
            }, 500);
        });
    });
}

function onUpdateItem(reciveData) {
    var data = reciveData.newDataPYC;
    var newCtpData = reciveData.newDataCTP
    console.log(newCtpData)
    updateItemWithId(pdnvtPath, data.idPhieuDeNghi, data).then((newData) => {
        updateCTP(newCtpData, () => {
            showPopup("Update", "Item updated");
            var ctpData = getChiTietPhieuById(data.idPhieuDeNghi);
            if (ctpData){
                const row = tableBody.find('.vattudataid' + data.idPhieuDeNghi);

                // Update each <td> element with the new values
                row.find('td:eq(1)').text(data.hoTen);
                row.find('td:eq(2)').text(newCtpData.tenVatTu);
                row.find('td:eq(3)').text(newCtpData.soLuongDeNghi);
                row.find('td:eq(4)').text(data.lyDoLapPhieu);
                row.find('td:eq(5)').text(data.tenTinhTrangDuyet);

                for (let index = 0; index < phieuDeNghiVatTu.length; index++) {
                    if (phieuDeNghiVatTu[index].idPhieuDeNghi == data.idPhieuDeNghi) {
                        phieuDeNghiVatTu[index] = data;
                    }
                }
            }
           
        })
    });
}

function onViewItem(id) {
    for (let index = 0; index < phieuDeNghiVatTu.length; index++) {
        if (phieuDeNghiVatTu[index].idPhieuDeNghi == id) {
            var ctpData = getChiTietPhieuById(phieuDeNghiVatTu[index].idPhieuDeNghi);
            if (ctpData){
                suaVatTu(phieuDeNghiVatTu[index], ctpData, eventDispatcher);
            }
            break;
        }
    }
}

function addRowToTable(data, index) {
    var ctpData = getChiTietPhieuById(data.idPhieuDeNghi);
    if (ctpData){
        var row = `
            <tr class = 'vattudataid${data.idPhieuDeNghi}'>
                <td>${index}</td>
                <td>${data.hoTen}</td>
                <td>${ctpData.tenVatTu}</td>
                <td>${ctpData.soLuongDeNghi}</td>
                <td>${data.lyDoLapPhieu}</td>
                <td>${data.tenTinhTrangDuyet}</td>
                <td><button class="delete-button" data-id="${data.idPhieuDeNghi}">Chi tiết</button></td>
            </tr>
        `;
    
            tableBody.append(row);
    }
    
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

function addProduct(pycData, ctpData) {
    postData(pdnvtPath, pycData).then((data) => {
        postData(ctpPath, ctpData).then((newctpData) => {
            pdnvtMapping[pycData.idPhieuDeNghi] = ctpData;
            chiTietPhieus.push(newctpData);
            phieuDeNghiVatTu.push(pycData);
            showPopup("Added", "Item added")
            addRowToTable(pycData, phieuDeNghiVatTu.length);
            setTimeout(() => {
                resetIndexOnTable();
            }, 500);
            // $('.delete-button').on('click', function () {
            //     eventDispatcher.dispatchEvent('deleteItem', data.idVatTu);
            // });
        })
    })
}