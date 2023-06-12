import Swal from "sweetalert2";
import { path } from "./constant";
import { icons } from "./icons";

export const menu = [
  { field: "Trang chủ", path: path.STAR },
  { field: "Cho thuê phòng trọ", path: path.RENTAL_ROOM },
  { field: "Nhà cho thuê", path: path.RENTAL_HOUSE },
  { field: "Cho thuê căn hộ", path: path.RENTAL_APARTMENT },
  { field: "Cho thuê mặt bằng", path: path.RENTAL_SPACE },
  { field: "Tìm người ở ghép", path: path.STAR },
  { field: "Blog", path: path.STAR },
  { field: "Hướng dẫn", path: path.STAR },
  { field: "Nạp tiền", path: path.STAR },
  { field: "Bảng giá", path: path.STAR },
];

export const informSuccess = (msg) => {
  return Swal.fire({
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    text: msg,
    position: "center",
  });
};

export const informFail = (msg) => {
  return Swal.fire({
    icon: "error",
    title: "Something went wrong",
    text: msg,
  });
};

export const inforHomepage = {
  title: "Kênh thông tin Phòng Trọ số 1 Việt Nam",
  des: "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

const { GoHome, FcNext, IoPricetagOutline, RxCrop, TbMapPin } = icons;

export const searchTypes = [
  {
    type: "Phòng trọ, nhà trọ",
    beforeIcon: GoHome,
    afterIcon: FcNext,
    sign: "home",
  },
  {
    type: "Toàn quốc",
    beforeIcon: TbMapPin,
    afterIcon: FcNext,
    sign: "location",
  },
  {
    type: "Chọn giá",
    beforeIcon: IoPricetagOutline,
    afterIcon: FcNext,
    sign: "price",
  },
  {
    type: "Chọn diện tích",
    beforeIcon: RxCrop,
    afterIcon: FcNext,
    sign: "area",
  },
];

export const inforProvince = [
  {
    location: "Phòng trọ Hồ Chí Minh",
    path: "https://phongtro123.com/images/location_hcm.jpg",
  },
  {
    location: "Phòng trọ Hà Nội",
    path: "https://phongtro123.com/images/location_hn.jpg",
  },
  {
    location: "Phòng trọ Đà Nẵng",
    path: "https://phongtro123.com/images/location_dn.jpg",
  },
];

export const CalculatePages = (currentPage, maxPage, minPage) => {
  let arrayPage = [];
  let end =
    currentPage >= maxPage - 1
      ? maxPage
      : minPage === currentPage
      ? currentPage + 2
      : currentPage + 1;
  let start =
    currentPage <= minPage + 1
      ? minPage
      : maxPage === currentPage
      ? currentPage - 2
      : currentPage - 1;
  for (let i = start; i <= end; i++) {
    arrayPage.push(i);
  }
  return arrayPage;
};

export const formattedDataToNavRight = (data) => {
  const elLeft = data?.filter((item) => item.order % 2 !== 0);
  const elRight = data?.filter((item) => item.order % 2 === 0);
  const formatted = elLeft?.map((item) => {
    return {
      left: item,
      right: elRight?.find((el) => el.order === item.order + 1),
    };
  });
  return formatted;
};

export const formatVietnameseToString = (keyword) => {
  return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const dataIntroduction = {
  title: "Tại sao lại chọn PhongTro123.com?",
  des: {
    first:
      "Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: ",
    second:
      "...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn",
  },
  statistics: [
    {
      name: "Thành viên",
      value: "116.998+",
    },
    {
      name: "Tin đăng",
      value: "103.348+",
    },
    {
      name: "Lượt truy cập/tháng",
      value: "300.000+",
    },
    {
      name: "Lượt xem/tháng",
      value: "2.500.000+",
    },
  ],
  subTitle: "Chi phí thấp, hiệu quả tối đa",
  feedback: `"Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."`,
  customer: "Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)",
  question: "Bạn đang có phòng trọ / căn hộ cho thuê?",
  answer: "Không phải lo tìm người cho thuê, phòng trống kéo dài",
};

export const dataContact = {
  pathImg: "https://phongtro123.com/images/support-bg.jpg",
  title: "Liên hệ với chúng tôi nếu bạn cần hỗ trợ:",
  support: [
    {
      name: "HỖ TRỢ THANH TOÁN",
      phone: "0399331472",
      zalo: "0399331472",
    },
    {
      name: "Hỗ trợ đăng tin",
      phone: "0399331472",
      zalo: "0399331472",
    },
    {
      name: "Hotline 24/7",
      phone: "0399331472",
      zalo: "0399331472",
    },
  ],
};

export const minMaxPriceValue = (text) => {
  const arrayNumberMinMax = text && text.split(" ").filter((item) => !!+item);
  return arrayNumberMinMax;
};

export const minMaxAreaValue = (text) => {
  const arraySplit =
    text &&
    text
      .split(" ")
      .filter((item) => item.match(/\d/g))
      .map((item) => item.split(""))
      .flat();

  const arrayNumber =
    text && arraySplit.map((item) => !!+item && `${item}0`).filter((i) => !!i);

  return arrayNumber;
};

export const formatDataMinMax = (data, type) => {
  return data.map((item) => {
    const minMax =
      type === "price"
        ? minMaxPriceValue(item.value)
        : minMaxAreaValue(item.value);
    if (minMax.length === 2) {
      return {
        ...item,
        min: +minMax[0],
        max: +minMax[1],
      };
    } else {
      if (type === "area") {
        return {
          ...item,
          min: +minMax[0] === 20 ? 0 : +minMax[0],
          max: +minMax[0] === 20 ? 20 : 9999,
        };
      } else {
        return {
          ...item,
          min: +minMax[0] === 1 ? 0 : +minMax[0],
          max: +minMax[0] === 1 ? 1 : 9999,
        };
      }
    }
  });
};

export const getCodes = (minMax, data, name) => {
  const dataMinMax = formatDataMinMax(data, name);
  const dataCodes = dataMinMax
    .filter((item) => {
      return (
        (item.min >= minMax[0] && item.min <= minMax[1]) ||
        (item.max >= minMax[0] && item.max <= minMax[1])
      );
    })
    .map((item) => item.code);
  return dataCodes;
};

export const behaviorUser = [
  {
    text: "Đăng tin cho thuê",
    icon: "https://phongtro123.com/images/dashboard-add-post.svg",
    path: `he-thong/${path.NEW_POST}`,
  },
  {
    text: "Quản lý tin đăng",
    icon: "https://phongtro123.com/images/dashboard-manage-post.svg",
    path: path.MANAGEMENT_POST,
  },
  {
    text: "Thông tin cá nhân",
    icon: "https://phongtro123.com/images/dashboard-user.svg",
    path: path.INFO_USER,
  },
];

export const menuUser = [
  {
    text: "Đăng tin cho thuê",
    icon: "https://phongtro123.com/images/dashboard-add-post.svg",
    path: `/he-thong/${path.NEW_POST}`,
  },
  {
    text: "Quản lý tin đăng",
    icon: "https://phongtro123.com/images/dashboard-manage-post.svg",
    path: `/he-thong/${path.MANAGEMENT_POST}`,
  },
  {
    text: "Chỉnh sữa cá nhân",
    icon: "https://phongtro123.com/images/dashboard-user.svg",
    path: `/he-thong/${path.INFO_USER}`,
  },
];

export const getNumbeFromString = (string) => {
  return string.match(/\d/g).join("");
};
