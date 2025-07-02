const contactInfo = [
  {
    id: 1,
    // type: "phone",
    // icon: "phone", // Sử dụng string thay vì component
    href: "tel:+84931541339",
    text: "(+84) 93 154 1339",
  },
  {
    id: 2,
    // type: "email",
    // icon: "email",
    href: "mailto:info@suritechs.com",
    text: "info@suritechs.com",
  },
  {
    id: 3,
    // type: "email",
    // icon: "email",
    href: "mailto:tram@suritechs.com",
    text: "tram@suritechs.com",
  },
  {
    id: 4,
    // type: "email",
    // icon: "email",
    href: "https://www.suritechs.com/",
    text: "https://www.suritechs.com/",
  },
];

const officeLocations = [
  {
    id: 1,
    address: "VP HCM: 897 Hoàng Sa, P11, Quận 3, Tp HCM",
  },
  {
    id: 2,
    address: "VP Đà Lạt: 5 Nam Kỳ Khởi Nghĩa, Phường 01, TP Đà Lạt ",
  },
  {
    id: 3,
    address: "VP Lâm Hà: Thôn Phúc Hưng, Xã Tân Hà, Huyện Lâm Hà",
  },
  {
    id: 4,
    address: "Trụ sở India: Jaipur, Rajasthan, Ấn Độ",
  },
];
// Export để sử dụng trong component
export { contactInfo, officeLocations };

// Hoặc export default nếu muốn
export default {
  contactInfo,
  officeLocations,
};
