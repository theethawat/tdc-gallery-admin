import { Image } from "./Image";

export enum PeopleStatus {
  COUPLE = "couple",
  FRIEND = "friend",
  FAMILY = "family",
  COLLEAGUE = "colleague",
  SENIOR_JUNIOR = "senior_junior",
  OTHER = "other",
}

export const PeopleStatusInfo = {
  [PeopleStatus.COUPLE]: {
    translation: {
      en: "Couple",
      th: "คู่รัก",
    },
    color: "bg-pink-200 text-pink-800",
  },
  [PeopleStatus.FRIEND]: {
    translation: {
      en: "Friend",
      th: "เพื่อน",
    },
    color: "bg-blue-200 text-blue-800",
  },
  [PeopleStatus.FAMILY]: {
    translation: {
      en: "Family",
      th: "ครอบครัว",
    },
    color: "bg-green-200 text-green-800",
  },
  [PeopleStatus.COLLEAGUE]: {
    translation: {
      en: "Colleague",
      th: "เพื่อนร่วมงาน",
    },
    color: "bg-yellow-200 text-yellow-800",
  },
  [PeopleStatus.SENIOR_JUNIOR]: {
    translation: {
      en: "Senior/Junior",
      th: "รุ่นพี่/รุ่นน้อง",
    },
    color: "bg-purple-200 text-purple-800",
  },
  [PeopleStatus.OTHER]: {
    translation: {
      en: "Other",
      th: "อื่นๆ",
    },
    color: "bg-gray-200 text-gray-800",
  },
};

export interface People {
  _id: string;
  name: string;
  calledName?: string;
  nickname?: string;
  birthday?: Date;
  nationality?: string;
  status: PeopleStatus;
  knownDate?: Date;
  image?: Image;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
  meetingPlace?: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
