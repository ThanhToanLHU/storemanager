let phongBanDic = {};

phongBan = [{
    idPhongBan: 1,
    tenPhongBan: "Phòng Tài Chính",
    maPhongBan: "TC"
},
{
    idPhongBan: 3,
    tenPhongBan: "Phòng Vật Tư",
    maPhongBan: "VT",
},
{
    idPhongBan: 4,
    tenPhongBan: "Phòng Kế Toán",
    maPhongBan: "KTo"
},
{
    idPhongBan: 5,
    tenPhongBan: "Phòng Kĩ Thuật",
    maPhongBan: "KT"
}]

phongBan.forEach(pb => {
    phongBanDic[pb.idPhongBan] = pb.tenPhongBan;
});