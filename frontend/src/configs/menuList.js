import {
  faTv,
  faList,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const menuList = [
  {
    name: "จัดการรายการ",
    link: "/article",
    icon: faListAlt,
  },
  {
    name: "เพิ่มจัดการรายการ",
    link: "/article/create",
    icon: faPlus,
  },
  {
    name: "จัดการสถานที่จัดแสดง",
    link: "/management/place",
    icon: faTv,
  },
  {
    name: "จัดการหมวดหมู่",
    link: "/management/category",
    icon: faList,
  },
];

export default menuList;
