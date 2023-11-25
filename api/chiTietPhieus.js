const ctpPath = 'api/ChiTietPhieu';
let ctpPromise = getChiTietPhieu();

function getChiTietPhieu() {
    return new Promise((resolve, reject) => {
        try {
            if (chiTietPhieus.length <= 0) {
                getAllData(ctpPath).then((data) => {
                    chiTietPhieus = data;
                    
                    console.log(chiTietPhieus)
                    resolve(chiTietPhieus);
                });
            }
        }
        catch (e){
            reject(null);
        }
    })
}
