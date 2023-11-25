const chucVuPath = 'api/ChucVu';
let chucVuPromise = getChucVu();
let chucVuDic = {};
function getChucVu() {
    return new Promise((resolve, reject) => {
        try {
            if (chucvus.length <= 0) {
                getAllData(chucVuPath).then((data) => {
                    chucvus = data;
                    chucvus.forEach(cv => {
                        chucVuDic[cv.idChucVu] = cv.tenChucVu;
                    });
                    resolve(chucvus);
                });
            }
        }
        catch (e){
            reject(null);
        }
        
    })
}
