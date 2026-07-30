export const POPULAR_TAGS = [
  { id: 1, tagLabel: "#Всі", tagValue: "", query: "", endpoint: `/recipes` },
  {
    id: 2,
    tagLabel: "#До 20 хвилин",
    tagValue: "",
    query: "",
    endpoint: `/recipes?maxTime=20`,
  },
  {
    id: 3,
    tagLabel: "#Низькокалорійні",
    tagValue: "",
    query: "",
    endpoint: `/recipes?calories=200`,
  },
  {
    id: 4,
    tagLabel: "#Риба та морепродукти",
    tagValue: "",
    query: "",
    endpoint: "/recipes?category=lunch_dinner&subCategory=fish",
  },
  {
    id: 5,
    tagLabel: "#Снеки",
    tagValue: "",
    query: "",
    endpoint: `/recipes?category=snacks`,
  },
];
