const menutItems = [
  {
    title: "Ana Sayfa",
    path: "/",
    icon: "house-user",
  },
  {
    title: "Profil",
    path: "/profile/info",
    icon: "id-badge",
    subNav: [
      {
        title: "Bilgilerim",
        path: "/profile/info",
        icon: "circle",
      },
      {
        title: "Not Görüntüleme",
        path: "/profile/grades",
        icon: "circle",
      },
      {
        title: "Ortak Eğitim Bilgilerim",
        path: "/profile/internships",
        icon: "circle",
      },
      {
        title: "İkinci Yabancı Dil Bilgilerim",
        path: "/profile/sfl",
        icon: "circle",
      },
      {
        title: "Ödeme Bilgilerim",
        path: "/profile/payment",
        icon: "circle",
      },
      {
        title: "Adres / İletişim Bilgilerim",
        path: "/profile/addresses",
        icon: "circle",
      },
    ],
  },
  {
    title: "Dönem Bilgilerim",
    path: "/semester/courses",
    icon: "chalkboard-user",
    subNav: [
      {
        title: "Derslerim",
        path: "/semester/courses",
        icon: "circle",
      },
      {
        title: "Ders Programım",
        path: "/semester/curriculum",
        icon: "circle",
      },
    ],
  },
  {
    title: "Sınav Takvimi",
    path: "/exams/midterms",
    icon: "file-pen",
    subNav: [
      {
        title: "Ara Sınav",
        path: "/exams/midterms",
        icon: "circle",
      },
      {
        title: "Dönem Sonu Sınavı",
        path: "/exams/finals",
        icon: "circle",
      },
      {
        title: "Bütünleme Sınavı",
        path: "/exams/makeups",
        icon: "circle",
      },
    ],
  },
  {
    title: "Sosyal Ağlar",
    path: "/otherpages/blog",
    icon: "people-group",
    subNav: [
      {
        title: "Blog Sayfası",
        path: "/otherpages/blog",
        icon: "circle",
      },
      {
        title: "Randevularım",
        path: "/otherpages/appointment",
        icon: "circle",
      },
    ],
  },
];

export default menutItems;
