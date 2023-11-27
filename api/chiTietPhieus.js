
function getChiTietPhieuById(id){
    return pdnvtMapping[id];
    console.log(id)

    isHasData = false;
    let that = this;
    return new Promise((resolve, reject) => {
        chiTietPhieus.forEach(phieu => {
            if (phieu.idPhieuDeNghiMua == id && !that.isHasData){
                that.isHasData = true;
                resolve(phieu);
            }
        });
    
        if (!isHasData){
            reject();
        }
    });
}

function updateCTP(data, callback) {
    updateItemWithId(ctpPath, data.idChiTietPhieu, data).then((newData) => {
        for (let index = 0; index < chiTietPhieus.length; index++) {
            if (chiTietPhieus[index].idChiTietPhieu == data.idChiTietPhieu){
                chiTietPhieus[index] = data;
                console.log(data)
            }
            
        }
        callback();
    });
}