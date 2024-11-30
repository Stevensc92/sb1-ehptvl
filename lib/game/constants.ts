export const VILLAGES = [
  {
    id: "konoha",
    name: "Konoha",
    description: "Le Village Caché des Feuilles",
    bonusStats: {
      ninjutsu: 2,
      chakra: 1,
    },
  },
  {
    id: "suna",
    name: "Suna",
    description: "Le Village Caché du Sable",
    bonusStats: {
      genjutsu: 2,
      precision: 1,
    },
  },
] as const;

export const INITIAL_STATS: CharacterStats = {
  taijutsu: 5,
  ninjutsu: 5,
  genjutsu: 5,
  fortitude: 50,
  chakra: 10,
  initiative: 5,
  precision: 5,
  speed: 5,
};

export const STARTER_SKILLS = {
  taijutsu: [
    {
      id: "basic-punch",
      name: "Coup de poing basique",
      description: "Une attaque physique simple mais efficace",
      chakraCost: 0,
      damage: 3,
      type: "taijutsu",
      cooldown: 0,
    },
  ],
  ninjutsu: [
    {
      id: "basic-jutsu",
      name: "Jutsu basique",
      description: "Une technique ninja fondamentale",
      chakraCost: 2,
      damage: 4,
      type: "ninjutsu",
      cooldown: 1,
    },
  ],
  genjutsu: [
    {
      id: "basic-illusion",
      name: "Illusion basique",
      description: "Une illusion simple pour perturber l'adversaire",
      chakraCost: 3,
      damage: 2,
      type: "genjutsu",
      cooldown: 2,
    },
  ],
} as const;