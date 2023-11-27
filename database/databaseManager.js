const vatTuPath = "api/VatTu/";
const ctpPath = 'api/ChiTietPhieu/';
const userPath = "api/Users/";
const pdnvtPath = "api/PhieuDeNghiVatTu/";
const ptmPath = "api/PhieuTrinhMua/"

var pdnvtMapping = {};
var vatus = [];
var chucvus = [];
var users = [];
var phongBan = [];
var chiTietPhieus = [];
var phieuDeNghiVatTu = [];
var tinhTrangPhieus = [];
var phieuTrinhMuas = []

var currentUser = {
    idChucVu: 1,
    idPhongBan: 3,
    idUser: 18,
    hoTen: "lê nam sang"
}

var vatTuPromise = getAllTableData(vatTuPath).then(data => {
    vatus = data;
});
let ctpPromise = getAllTableData(ctpPath).then(data => {
    chiTietPhieus = data;
});
let userPromise = getAllTableData(userPath).then(data => {
    users = data;
});

let pdnvtPromise = getAllTableData(pdnvtPath).then(data => {
    phieuDeNghiVatTu = data;
})

let ptmPromise = getAllTableData(ptmPath).then(data => {
    phieuTrinhMuas = data;
})

let initDone = initAllData();

function initAllData(){
    return new Promise((resolve, reject) => {
        userPromise.then(() =>{
            vatTuPromise.then(() => {
                ctpPromise.then(() => {
                    pdnvtPromise.then(() => {
                        ptmPromise.then(() => {
                            
                            phieuDeNghiVatTu.forEach(phieu => {
                                chiTietPhieus.forEach(ctp => {
                                    if (ctp.idPhieuDeNghi == phieu.idPhieuDeNghi){
                                        pdnvtMapping[ctp.idPhieuDeNghi] = ctp;
                                    }
                                })
                            });
                            
                            resolve();
                        })
                    })
                })
            })
        })
    })
}


function getAllTableData(path){
    return new Promise((resolve, reject) => {
        try {
            getAllData(path).then((data) => {
                resolve(data);
            });
        }
        catch (e){
            reject(e);
        }
    });
}
