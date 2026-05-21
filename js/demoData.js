// Demo static data for guest mode
export const DEMO_DATA = {
  // Example placeholder data for early access leads count
  earlyAccessLeads: 123,

  // Example static user profile for demo
  userProfile: {
    uid: "demo_guest_uid",
    name: "Visitante CoreLab",
    email: "convidado@corelab.com.br",
    photoURL: "",
    level: "Intermediário",
    goal: "Hipertrofia",
    daysPerWeek: "4 dias",
    xp: 1250,
    streak: 5,
    totalWorkouts: 14,
  },

  // 4 beautifully pre-populated workout sessions spanning the last week
  workouts: [
    {
      id: "demo_w_1",
      name: "Treino A — Peito & Tríceps",
      duration: 55,
      volume: 4800,
      calories: 450,
      exercises: ["Supino Reto (4x10)", "Crucifixo Inclinado (3x12)", "Tríceps Pulley (4x10)", "Tríceps Testa (3x12)"],
      notes: "Treino insano, pump absurdo no supino! Foco na fase excêntrica.",
      completedAt: { toDate: () => new Date(Date.now() - 4 * 3600000) } // Simulate Firestore Timestamp
    },
    {
      id: "demo_w_2",
      name: "Treino B — Costas & Bíceps",
      duration: 60,
      volume: 5200,
      calories: 480,
      exercises: ["Puxada Alta (4x10)", "Remada Curvada (4x8)", "Rosca Direta (4x10)", "Rosca Martelo (3x12)"],
      notes: "Progressão de carga na remada curvada para 60kg total.",
      completedAt: { toDate: () => new Date(Date.now() - 1 * 86400000 - 10 * 3600000) }
    },
    {
      id: "demo_w_3",
      name: "Treino C — Pernas Completo",
      duration: 75,
      volume: 7200,
      calories: 620,
      exercises: ["Agachamento Livre (4x8)", "Leg Press 45 (3x12)", "Cadeira Extensora (4x10)", "Mesa Flexora (4x10)"],
      notes: "Força total no agachamento. 100kg para 8 repetições fáceis.",
      completedAt: { toDate: () => new Date(Date.now() - 3 * 86400000 - 14 * 3600000) }
    },
    {
      id: "demo_w_4",
      name: "Treino D — Ombros & Abdômen",
      duration: 50,
      volume: 3100,
      calories: 380,
      exercises: ["Desenvolvimento Halteres (4x10)", "Elevação Lateral (4x12)", "Abdominal Supra (4x15)", "Prancha (3x60s)"],
      notes: "Série gigante de elevação lateral para queimar tudo no final.",
      completedAt: { toDate: () => new Date(Date.now() - 5 * 86400000 - 9 * 3600000) }
    }
  ],

  // Sleep entries for the last 5 nights
  sleep: [
    {
      id: "demo_s_1",
      hours: 7.5,
      quality: 8,
      bedtime: "23:00",
      wakeTime: "06:30",
      recordedAt: { toDate: () => new Date(Date.now() - 8 * 3600000) }
    },
    {
      id: "demo_s_2",
      hours: 6.8,
      quality: 6,
      bedtime: "23:30",
      wakeTime: "06:15",
      recordedAt: { toDate: () => new Date(Date.now() - 1 * 86400000 - 8 * 3600000) }
    },
    {
      id: "demo_s_3",
      hours: 8.0,
      quality: 9,
      bedtime: "22:45",
      wakeTime: "06:45",
      recordedAt: { toDate: () => new Date(Date.now() - 2 * 86400000 - 8 * 3600000) }
    },
    {
      id: "demo_s_4",
      hours: 7.2,
      quality: 7,
      bedtime: "23:15",
      wakeTime: "06:30",
      recordedAt: { toDate: () => new Date(Date.now() - 3 * 86400000 - 8 * 3600000) }
    },
    {
      id: "demo_s_5",
      hours: 7.8,
      quality: 8,
      bedtime: "23:00",
      wakeTime: "06:45",
      recordedAt: { toDate: () => new Date(Date.now() - 4 * 86400000 - 8 * 3600000) }
    }
  ],

  // Nutrition entries for the last 5 days
  nutrition: [
    {
      id: "demo_n_1",
      calories: 2750,
      protein: 175,
      carbs: 310,
      fats: 78,
      water: 3000,
      recordedAt: { toDate: () => new Date(Date.now() - 4 * 3600000) }
    },
    {
      id: "demo_n_2",
      calories: 2600,
      protein: 160,
      carbs: 290,
      fats: 85,
      water: 2500,
      recordedAt: { toDate: () => new Date(Date.now() - 1 * 86400000 - 4 * 3600000) }
    },
    {
      id: "demo_n_3",
      calories: 2900,
      protein: 190,
      carbs: 330,
      fats: 80,
      water: 3500,
      recordedAt: { toDate: () => new Date(Date.now() - 2 * 86400000 - 4 * 3600000) }
    },
    {
      id: "demo_n_4",
      calories: 2820,
      protein: 185,
      carbs: 315,
      fats: 82,
      water: 3200,
      recordedAt: { toDate: () => new Date(Date.now() - 3 * 86400000 - 4 * 3600000) }
    },
    {
      id: "demo_n_5",
      calories: 2780,
      protein: 180,
      carbs: 305,
      fats: 79,
      water: 3000,
      recordedAt: { toDate: () => new Date(Date.now() - 4 * 86400000 - 4 * 3600000) }
    }
  ],

  // Cardio entries
  cardio: [
    {
      id: "demo_c_1",
      type: "Corrida",
      duration: 30,
      calories: 350,
      avgHr: 145,
      maxHr: 172,
      distance: 5.2,
      recordedAt: { toDate: () => new Date(Date.now() - 10 * 3600000) }
    },
    {
      id: "demo_c_2",
      type: "HIIT",
      duration: 20,
      calories: 280,
      avgHr: 162,
      maxHr: 185,
      distance: 0,
      recordedAt: { toDate: () => new Date(Date.now() - 1 * 86400000 - 15 * 3600000) }
    },
    {
      id: "demo_c_3",
      type: "Ciclismo",
      duration: 45,
      calories: 400,
      avgHr: 138,
      maxHr: 160,
      distance: 15.4,
      recordedAt: { toDate: () => new Date(Date.now() - 3 * 86400000 - 12 * 3600000) }
    },
    {
      id: "demo_c_4",
      type: "Caminhada",
      duration: 25,
      calories: 180,
      avgHr: 112,
      maxHr: 125,
      distance: 2.1,
      recordedAt: { toDate: () => new Date(Date.now() - 5 * 86400000 - 11 * 3600000) }
    }
  ],

  // Body measurements showing weight loss and recomposition over 4 weeks
  measurements: [
    {
      id: "demo_m_1",
      weight: 82.5,
      fatPct: 18.5,
      waist: 88,
      chest: 102,
      biceps: 37.5,
      thigh: 58,
      recordedAt: { toDate: () => new Date(Date.now() - 28 * 86400000) }
    },
    {
      id: "demo_m_2",
      weight: 82.1,
      fatPct: 18.2,
      waist: 87.5,
      chest: 102.2,
      biceps: 37.7,
      thigh: 58.2,
      recordedAt: { toDate: () => new Date(Date.now() - 21 * 86400000) }
    },
    {
      id: "demo_m_3",
      weight: 81.6,
      fatPct: 17.8,
      waist: 87,
      chest: 102.5,
      biceps: 37.8,
      thigh: 58.4,
      recordedAt: { toDate: () => new Date(Date.now() - 14 * 86400000) }
    },
    {
      id: "demo_m_4",
      weight: 81.2,
      fatPct: 17.4,
      waist: 86.5,
      chest: 103,
      biceps: 38.0,
      thigh: 58.5,
      recordedAt: { toDate: () => new Date(Date.now() - 7 * 86400000) }
    }
  ],

  // Goals
  goals: [
    {
      id: "demo_g_1",
      name: "Perda de Gordura (chegar a 80kg)",
      icon: "⚖️",
      current: 81.2,
      target: 80,
      unit: "kg",
      color: "var(--orange)",
      deadline: "2026-06-30",
      updatedAt: { toDate: () => new Date() }
    },
    {
      id: "demo_g_2",
      name: "Pegar 100kg no Supino",
      icon: "💪",
      current: 92.5,
      target: 100,
      unit: "kg",
      color: "var(--purple)",
      deadline: "2026-07-15",
      updatedAt: { toDate: () => new Date() }
    },
    {
      id: "demo_g_3",
      name: "Beber 3L de água diários",
      icon: "💧",
      current: 3000,
      target: 3000,
      unit: "ml",
      color: "var(--blue)",
      deadline: "2026-05-31",
      updatedAt: { toDate: () => new Date() }
    }
  ],

  // Chat message history for Coach IA
  chatHistory: [
    {
      id: "demo_msg_1",
      role: "assistant",
      content: "👋 Olá, **Visitante CoreLab**! Sou o **Coach IA do CoreLab**.\n\nBaseado no seu perfil (**Intermediário**, foco em **hipertrofia**), estou pronto para criar treinos personalizados, responder dúvidas sobre nutrição, recuperação, suplementação e muito mais.\n\nUse as sugestões ao lado ou escreva sua pergunta. O que posso fazer por você hoje? 💪",
      createdAt: { toDate: () => new Date(Date.now() - 600000) }
    }
  ],

  // Community Feed posts
  communityPosts: [
    {
      id: "demo_p_1",
      userId: "user_lucas",
      userName: "Lucas Andrade",
      userInitials: "LA",
      text: "Hoje o treino de perna foi bruto! Agachamento com 140kg e saí tremendo. Quem mais bateu PR hoje? 🏋️💪",
      type: "text",
      likes: ["user_ana", "user_pedro", "demo_guest_uid"],
      likesCount: 3,
      commentsCount: 3,
      createdAt: { toDate: () => new Date(Date.now() - 2 * 3600000) }
    },
    {
      id: "demo_p_2",
      userId: "user_carol",
      userName: "Carol Lima",
      userInitials: "CL",
      text: "Corrida matinal concluída! 8km de corrida leve para começar o dia com o cortisol baixo. Como está o foco de vocês hoje? 🏃‍♀️✨",
      type: "text",
      likes: ["user_lucas"],
      likesCount: 1,
      commentsCount: 1,
      createdAt: { toDate: () => new Date(Date.now() - 5 * 3600000) }
    },
    {
      id: "demo_p_3",
      userId: "user_felipe",
      userName: "Felipe Melo",
      userInitials: "FM",
      text: "Refeição livre de ontem bateu perfeitamente. Hoje a energia estava insana no treino de costas. Consistência é o segredo! 🥩🍚",
      type: "text",
      likes: ["user_lucas", "user_carol", "user_ana"],
      likesCount: 3,
      commentsCount: 0,
      createdAt: { toDate: () => new Date(Date.now() - 12 * 3600000) }
    }
  ],

  // Challenges
  challenges: [
    {
      id: "challenge_hiit",
      name: "30 Dias HIIT de Elite",
      creator: "Por @CoreLab_Fitness",
      icon: "🔥",
      prizeVal: "🏆 Troféu",
      prizeLabel: "Badge no Perfil",
      desc: "20 a 30 minutos de cardio HIIT diariamente por 30 dias para triturar gordura corporal.",
      participantsCount: 1547,
      daysLeft: 16,
      score: 4.9,
      participants: ["demo_guest_uid", "user_lucas"],
      createdAt: { toDate: () => new Date() }
    }
  ]
};
