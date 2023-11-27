let tinhTrangDic = {};

tinhTrangPhieus = [{
    idTinhTrangPhieu: 1,
    tenTinhTrangDuyet: "Đang duyệt",
},
{
    idTinhTrangPhieu: 2,
    tenTinhTrangDuyet: "Không duyệt",
},
{
    idTinhTrangPhieu: 3,
    tenTinhTrangDuyet: "Đã duyệt",
}
]

tinhTrangPhieus.forEach(p => {
    tinhTrangDic[p.idTinhTrangPhieu] = p.tenTinhTrangDuyet;
});