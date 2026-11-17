import type { Person } from "@/types";

/**
 * МОК-ДАНІ. Усі особи, крім першої, вигадані для наповнення макета.
 * Сертифікати — заглушки: внесіть реальні назви, організації та роки.
 */
export const people: Person[] = [
  {
    slug: "yevhen-sluchevskyi",
    kind: "doctor",
    name: { uk: "Євген Случевський", en: "Eugene Sluchevskiy" },
    role: { uk: "Лікар-стоматолог, викладач гнатології", en: "Dentist, gnathology lecturer" },
    bio: {
      uk: "Засновник GnathoHUB. Поєднує клінічну практику, викладання гнатології та розробку GnathoLine.",
      en: "Founder of GnathoHUB. Combines clinical practice, teaching gnathology and building GnathoLine.",
    },
    specialties: [
      { uk: "Функціональна діагностика", en: "Functional diagnostics" },
      { uk: "Сплінт-терапія", en: "Splint therapy" },
      { uk: "Планування у віртуальному артикуляторі", en: "Virtual articulator planning" },
    ],
    certificates: [
      { title: { uk: "[Назва сертифіката або курсу]", en: "[Certificate or course title]" }, issuer: "[Організація]", year: 2024 },
    ],
  },
  {
    slug: "olena-marchenko",
    kind: "doctor",
    name: { uk: "Олена Марченко", en: "Olena Marchenko" },
    role: { uk: "Лікар-ортодонт", en: "Orthodontist" },
    bio: {
      uk: "Веде пацієнтів після сплінт-терапії, коли потрібна ортодонтична стабілізація прикусу. Пише статті для пацієнтів.",
    },
    specialties: [{ uk: "Ортодонтія дорослих" }, { uk: "Лікування на елайнерах" }, { uk: "Міждисциплінарні плани" }],
    experienceYears: 11,
    certificates: [
      { title: { uk: "Спеціалізація з ортодонтії" }, issuer: "[Заклад освіти]", year: 2015 },
      { title: { uk: "Курс із функціональної оклюзії" }, issuer: "[Навчальний центр]", year: 2021 },
    ],
  },
  {
    slug: "andrii-kovalenko",
    kind: "technician",
    name: { uk: "Андрій Коваленко", en: "Andrii Kovalenko" },
    role: { uk: "Керівник зуботехнічної лабораторії", en: "Head of the dental laboratory" },
    bio: {
      uk: "Відповідає за CAD-моделювання та фрезерування кап. Перевіряє кожне B2B-замовлення перед відправленням.",
    },
    specialties: [{ uk: "CAD/CAM-виготовлення сплінтів" }, { uk: "Фрезерування PMMA" }, { uk: "Контроль якості" }],
    experienceYears: 14,
    certificates: [{ title: { uk: "Сертифікований курс CAD/CAM" }, issuer: "[Виробник обладнання]", year: 2019 }],
  },
  {
    slug: "maksym-bondar",
    kind: "developer",
    name: { uk: "Максим Бондар", en: "Maksym Bondar" },
    role: { uk: "Провідний розробник GnathoLine", en: "Lead developer, GnathoLine" },
    bio: {
      uk: "Розробляє 3D-ядро та модулі GnathoLine. Працює разом із лікарями, щоб інструменти відповідали клінічному протоколу.",
    },
    specialties: [{ uk: "3D-графіка та обробка сіток" }, { uk: "Імпорт DICOM і STL" }, { uk: "Настільні застосунки для macOS і Windows" }],
    experienceYears: 9,
    certificates: [{ title: { uk: "Магістр комп'ютерних наук" }, issuer: "[Університет]", year: 2017 }],
  },
];

export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
