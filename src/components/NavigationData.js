const menutItems = [
    {
      title: "Profil",
      path: "/profile",
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
      path: "/semester",
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
      path: "/exams",
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
      path: "/otherpages",
      icon: "people-group",
      subNav: [
        {
          title: "Blog Sayfası",
          path: "/otherpages/blog",
          icon: "circle",
        },
        {
          title: "Randevülerim",
          path: "/otherpages/appointment",
          icon: "circle",
        }
      ]
    }
  ];

  export default menutItems;