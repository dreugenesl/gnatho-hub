import type { Integration, Localized, PricingPlan } from "@/types";

/** МОК-ДАНІ: назви модулів, тарифи й ціни — приклади для макета. */
export const modules: { name: string; text: Localized }[] = [
  { name: "Scene", text: { uk: "Єдина 3D-сцена для сканів, КТ і рухів щелепи" } },
  { name: "Mount", text: { uk: "Монтаж моделей у віртуальний артикулятор" } },
  { name: "Motion", text: { uk: "Імпорт і відтворення записаних рухів щелепи" } },
  { name: "Occlusion", text: { uk: "Карта оклюзійних контактів у статиці та динаміці" } },
  { name: "Splint", text: { uk: "Проєктування оклюзійних кап і сплінтів" } },
  { name: "Ceph", text: { uk: "Цефалометричний аналіз і оклюзійна площина" } },
  { name: "Report", text: { uk: "Звіт для пацієнта та для лабораторії" } },
  { name: "Export", text: { uk: "Експорт STL для фрезерування і друку" } },
];

export const integrations: Integration[] = [
  { name: "STL / PLY / OBJ", description: { uk: "Скани з будь-якого інтраорального чи лабораторного сканера" } },
  { name: "DICOM", description: { uk: "Конусно-променева КТ щелеп і суглобів" } },
  { name: "XML / CSV", description: { uk: "Дані кондилографії та параметри артикулятора" } },
  { name: "CAD/CAM", description: { uk: "Готовий STL для фрезерних верстатів і 3D-принтерів" } },
];

export const plans: PricingPlan[] = [
  {
    id: "solo",
    name: "Solo",
    priceMonthly: 1900,
    description: { uk: "Для лікаря, який починає працювати з цифровим протоколом." },
    features: [
      { uk: "1 робоче місце" },
      { uk: "Модулі Scene, Mount, Export" },
      { uk: "До 20 активних пацієнтів" },
      { uk: "Підтримка електронною поштою" },
    ],
  },
  {
    id: "clinic",
    name: "Clinic",
    priceMonthly: 4900,
    highlighted: true,
    description: { uk: "Для клініки з гнатологічним прийомом і власним плануванням кап." },
    features: [
      { uk: "До 5 робочих місць" },
      { uk: "Усі 8 модулів" },
      { uk: "Необмежена кількість пацієнтів" },
      { uk: "Пряма передача замовлень у лабораторію" },
      { uk: "Пріоритетна підтримка" },
    ],
  },
  {
    id: "lab",
    name: "Lab",
    priceMonthly: null,
    description: { uk: "Для лабораторій і мереж клінік з індивідуальними умовами." },
    features: [
      { uk: "Необмежена кількість робочих місць" },
      { uk: "Усі модулі та черга замовлень" },
      { uk: "Навчання команди" },
      { uk: "Персональний менеджер" },
    ],
  },
];

export const docsSections: { title: Localized; items: Localized[] }[] = [
  { title: { uk: "Початок роботи" }, items: [{ uk: "Системні вимоги (macOS, Windows)" }, { uk: "Встановлення та активація ключа" }, { uk: "Створення першого пацієнта" }] },
  { title: { uk: "Імпорт даних" }, items: [{ uk: "Скани STL і PLY" }, { uk: "КТ у форматі DICOM" }, { uk: "Дані кондилографії" }] },
  { title: { uk: "Планування" }, items: [{ uk: "Монтаж в артикулятор" }, { uk: "Проєктування сплінта" }, { uk: "Перевірка контактів" }] },
  { title: { uk: "Експорт" }, items: [{ uk: "STL для фрезерування" }, { uk: "Звіт для пацієнта" }, { uk: "Передача в лабораторію" }] },
];
