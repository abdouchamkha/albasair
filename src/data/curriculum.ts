import { Curriculum } from '@/types/curriculum'

export const curriculumData: Curriculum = {
    metadata: {
        appName: "بصائر - Basair",
        version: "1.0.0",
        description: "منصة تعليمية تفاعلية لبناء وعي علمي وأخلاقي",
        tagline: "بصائر... لأننا لا نعلم ماذا تفعل فقط، بل لماذا وكيف.",
        pillars: [
            {
                id: "worship",
                name: "العبادة",
                icon: "Moon",
                color: "#002B5C"
            },
            {
                id: "responsibility",
                name: "المسؤولية",
                icon: "Shield",
                color: "#D65DB1"
            },
            {
                id: "empathy",
                name: "التعاطف",
                icon: "Heart",
                color: "#FFC107"
            },
            {
                id: "knowledge",
                name: "المعرفة",
                icon: "BookOpen",
                color: "#10B981"
            },
            {
                id: "skills",
                name: "المهارات",
                icon: "Wrench",
                color: "#8B5CF6"
            }
        ]
    },
    kidsPath: [
        {
            id: "phase_1",
            title: "مرحلة التأسيس",
            ageRange: "5-8 سنوات",
            description: "أساسيات العبادات والمسؤولية",
            icon: "Sprout",
            color: "#10B981",
            levels: [
                {
                    id: 1,
                    levelNumber: 1,
                    title: "لعبة الصلاة",
                    category: "أتعلم عبادتي",
                    pillar: "worship",
                    type: "interactive_game",
                    isExam: false,
                    description: "محاكاة الوضوء والصلاة بلعبة تفاعلية خطوة بخطوة",
                    xpReward: 100,
                    starsAvailable: 3,
                    estimatedTime: "15 دقيقة",
                    content: {
                        gameUrl: "/games/prayer-simulation",
                        videoIntro: "video_wudu_intro.mp4",
                        objectives: [
                            "تعلم خطوات الوضوء الصحيحة",
                            "معرفة أركان الصلاة",
                            "فهم أهمية الطهارة"
                        ],
                        activities: [
                            {
                                type: "drag_drop",
                                title: "رتب خطوات الوضوء",
                                items: [
                                    "غسل اليدين",
                                    "المضمضة",
                                    "الاستنشاق",
                                    "غسل الوجه",
                                    "غسل اليدين للمرفقين",
                                    "مسح الرأس",
                                    "غسل القدمين"
                                ]
                            },
                            {
                                type: "matching",
                                title: "طابق الركن مع وصفه",
                                pairs: [
                                    {
                                        term: "القيام",
                                        definition: "الوقوف في الصلاة"
                                    },
                                    {
                                        term: "الركوع",
                                        definition: "الانحناء مع قول سبحان ربي العظيم"
                                    },
                                    {
                                        term: "السجود",
                                        definition: "وضع الجبهة على الأرض"
                                    }
                                ]
                            }
                        ]
                    },
                    quiz: [
                        {
                            id: "q1_1",
                            text: "ما أول شيء نفعله في الوضوء؟",
                            options: [
                                "غسل الوجه",
                                "غسل اليدين",
                                "المضمضة"
                            ],
                            correctAnswer: "غسل اليدين",
                            explanation: "نبدأ الوضوء بغسل اليدين ثلاث مرات اقتداءً بسنة النبي ﷺ"
                        },
                        {
                            id: "q1_2",
                            text: "كم مرة نغسل كل عضو في الوضوء؟",
                            options: [
                                "مرة واحدة",
                                "مرتين",
                                "ثلاث مرات"
                            ],
                            correctAnswer: "ثلاث مرات",
                            explanation: "السنة غسل كل عضو ثلاث مرات، ويجوز مرة أو مرتين"
                        }
                    ]
                },
                {
                    id: 2,
                    levelNumber: 2,
                    title: "رحلة الصيام",
                    category: "أتعلم عبادتي",
                    pillar: "worship",
                    type: "story_lesson",
                    isExam: false,
                    description: "تعلم أحكام الصيام عبر قصة تفاعلية مشوقة",
                    xpReward: 120,
                    starsAvailable: 3,
                    estimatedTime: "20 دقيقة",
                    content: {
                        storyId: "fasting_journey_01",
                        characters: [
                            "سعيد",
                            "أم سعيد",
                            "جد سعيد"
                        ],
                        chapters: [
                            {
                                title: "اليوم الأول",
                                content: "يستيقظ سعيد لأول مرة على السحور ليصوم مع عائلته",
                                lesson: "أهمية السحور وبركته"
                            },
                            {
                                title: "الصبر الجميل",
                                content: "يشعر سعيد بالجوع لكنه يتذكر نصيحة جده",
                                lesson: "الصوم يعلمنا الصبر والتحمل"
                            },
                            {
                                title: "فرحة الإفطار",
                                content: "يفطر سعيد مع عائلته ويشعر بالفخر",
                                lesson: "للصائم فرحتان"
                            }
                        ]
                    },
                    quiz: [
                        {
                            id: "q2_1",
                            text: "ماذا نسمي وجبة ما قبل الفجر؟",
                            options: [
                                "الإفطار",
                                "السحور",
                                "الغداء"
                            ],
                            correctAnswer: "السحور",
                            explanation: "السحور هو الطعام الذي نأكله قبل أذان الفجر، وفيه بركة كبيرة"
                        },
                        {
                            id: "q2_2",
                            text: "ماذا يعلمنا الصيام؟",
                            options: [
                                "الصبر",
                                "الجوع فقط",
                                "النوم"
                            ],
                            correctAnswer: "الصبر",
                            explanation: "الصيام يعلمنا الصبر والتحكم في النفس والشعور بالفقراء"
                        }
                    ]
                },
                {
                    id: 3,
                    levelNumber: 3,
                    title: "أذكاري اليومية",
                    category: "أتعلم عبادتي",
                    pillar: "worship",
                    type: "audio_lesson",
                    isExam: false,
                    description: "تعلم أذكار الصباح والمساء بأصوات جميلة",
                    xpReward: 80,
                    starsAvailable: 3,
                    estimatedTime: "10 دقيقة",
                    content: {
                        audioTracks: [
                            {
                                id: "morning_athkar",
                                title: "أذكار الصباح",
                                duration: "5:30",
                                athkar: [
                                    {
                                        text: "أصبحنا وأصبح الملك لله",
                                        repeat: 1
                                    },
                                    {
                                        text: "اللهم بك أصبحنا وبك أمسينا",
                                        repeat: 1
                                    },
                                    {
                                        text: "سبحان الله وبحمده",
                                        repeat: 100
                                    }
                                ]
                            },
                            {
                                id: "evening_athkar",
                                title: "أذكار المساء",
                                duration: "5:00",
                                athkar: [
                                    {
                                        text: "أمسينا وأمسى الملك لله",
                                        repeat: 1
                                    },
                                    {
                                        text: "اللهم بك أمسينا وبك أصبحنا",
                                        repeat: 1
                                    }
                                ]
                            }
                        ]
                    },
                    quiz: [
                        {
                            id: "q3_1",
                            text: "متى نقول أذكار الصباح؟",
                            options: [
                                "بعد الفجر",
                                "قبل النوم",
                                "بعد الغداء"
                            ],
                            correctAnswer: "بعد الفجر",
                            explanation: "أذكار الصباح نقولها بعد صلاة الفجر حتى شروق الشمس"
                        }
                    ]
                },
                {
                    id: 4,
                    levelNumber: 4,
                    title: "البطل الصغير",
                    category: "أنا مسؤول",
                    pillar: "responsibility",
                    type: "video_task",
                    isExam: false,
                    description: "تعلم المسؤولية من خلال مهام يومية ممتعة",
                    xpReward: 100,
                    starsAvailable: 3,
                    estimatedTime: "15 دقيقة",
                    content: {
                        videoUrl: "little_hero_ep1.mp4",
                        episodes: [
                            {
                                title: "غرفتي مملكتي",
                                description: "تعلم ترتيب الغرفة",
                                tasks: [
                                    "ترتيب السرير",
                                    "تنظيم المكتب",
                                    "ترتيب الألعاب"
                                ]
                            },
                            {
                                title: "أنا مساعد ماما",
                                description: "مساعدة الأم في المنزل",
                                tasks: [
                                    "ترتيب طاولة الطعام",
                                    "حمل الأكياس الخفيفة",
                                    "سقي النباتات"
                                ]
                            }
                        ],
                        taskChecklist: [
                            {
                                id: "made_bed",
                                label: "رتبت سريري",
                                points: 10
                            },
                            {
                                id: "cleaned_desk",
                                label: "نظفت مكتبي",
                                points: 10
                            },
                            {
                                id: "helped_parent",
                                label: "ساعدت والديّ",
                                points: 15
                            }
                        ]
                    },
                    quiz: [
                        {
                            id: "q4_1",
                            text: "لماذا نرتب غرفتنا؟",
                            options: [
                                "لأن ماما قالت",
                                "لأن المسلم نظيف ومنظم",
                                "لا أعرف"
                            ],
                            correctAnswer: "لأن المسلم نظيف ومنظم",
                            explanation: "النظافة من الإيمان، والمسلم يحب أن يكون مرتباً ونظيفاً"
                        }
                    ]
                },
                {
                    id: 5,
                    levelNumber: 5,
                    title: "أخلاقي الجميلة",
                    category: "أنا مسؤول",
                    pillar: "empathy",
                    type: "interactive_story",
                    isExam: false,
                    description: "قصص تفاعلية عن الصدق والأمانة واحترام الآخرين",
                    xpReward: 90,
                    starsAvailable: 3,
                    estimatedTime: "15 دقيقة",
                    content: {
                        stories: [
                            {
                                title: "الأمانة تاج",
                                scenario: "وجدت محفظة في الملعب",
                                choices: [
                                    {
                                        text: "آخذها لي",
                                        result: "negative",
                                        feedback: "هذا ليس من الأمانة"
                                    },
                                    {
                                        text: "أسلمها للمعلم",
                                        result: "positive",
                                        feedback: "أحسنت! هذه هي الأمانة"
                                    },
                                    {
                                        text: "أتركها مكانها",
                                        result: "neutral",
                                        feedback: "الأفضل تسليمها لمن يبحث عنها"
                                    }
                                ]
                            },
                            {
                                title: "الصدق نجاة",
                                scenario: "كسرت كوب ماما بالخطأ",
                                choices: [
                                    {
                                        text: "أخفي الأمر",
                                        result: "negative",
                                        feedback: "الكذب يزيد المشكلة"
                                    },
                                    {
                                        text: "أخبر ماما وأعتذر",
                                        result: "positive",
                                        feedback: "الصادق دائماً محبوب"
                                    },
                                    {
                                        text: "أقول كسره أخي",
                                        result: "negative",
                                        feedback: "هذا ظلم وكذب معاً"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: 6,
                    levelNumber: 6,
                    title: "اختبار التأسيس",
                    category: "تقييم المرحلة",
                    pillar: "knowledge",
                    type: "exam",
                    isExam: true,
                    description: "اختبار شامل لمرحلة التأسيس",
                    xpReward: 250,
                    starsAvailable: 3,
                    estimatedTime: "10 دقيقة",
                    passingScore: 80,
                    unlocksCertificate: "شهادة البطل الصغير",
                    questions: [
                        {
                            id: "exam1_q1",
                            text: "ما هي الصلاة التي نصليها قبل شروق الشمس؟",
                            options: [
                                "الظهر",
                                "الفجر",
                                "العشاء",
                                "المغرب"
                            ],
                            correctAnswer: "الفجر",
                            explanation: "صلاة الفجر هي الصلاة التي نصليها قبل طلوع الشمس",
                            points: 10
                        },
                        {
                            id: "exam1_q2",
                            text: "ماذا نقول عند البدء في الوضوء؟",
                            options: [
                                "الحمد لله",
                                "بسم الله",
                                "الله أكبر",
                                "سبحان الله"
                            ],
                            correctAnswer: "بسم الله",
                            explanation: "نقول بسم الله قبل البدء في الوضوء",
                            points: 10
                        },
                        {
                            id: "exam1_q3",
                            text: "كم عدد الصلوات المفروضة في اليوم؟",
                            options: [
                                "3",
                                "4",
                                "5",
                                "6"
                            ],
                            correctAnswer: "5",
                            explanation: "الصلوات المفروضة خمس: الفجر، الظهر، العصر، المغرب، العشاء",
                            points: 10
                        }
                    ]
                }
            ]
        },
        {
            id: "phase_2",
            title: "مرحلة البناء",
            ageRange: "9-12 سنة",
            description: "مهارات ومبادرات ومساعدة الآخرين",
            icon: "Building",
            color: "#3B82F6",
            levels: [
                {
                    id: 7,
                    levelNumber: 7,
                    title: "يد العون",
                    category: "أساعد غيري",
                    pillar: "empathy",
                    type: "simulation",
                    isExam: false,
                    description: "لعبة يختار فيها الطفل شخصية محتاجة ويساعدها",
                    xpReward: 130,
                    starsAvailable: 3,
                    estimatedTime: "20 دقيقة",
                    content: {
                        scenarios: [
                            {
                                id: "elderly_neighbor",
                                title: "الجار المسن",
                                description: "جارك المسن يحتاج مساعدة في حمل أغراضه",
                                actions: [
                                    "حمل الأكياس",
                                    "فتح الباب",
                                    "السؤال عن صحته"
                                ],
                                reward: 50
                            },
                            {
                                id: "lost_child",
                                title: "الطفل الضائع",
                                description: "طفل صغير ضاع في المركز التجاري",
                                actions: [
                                    "تهدئته",
                                    "البحث عن والديه",
                                    "إخبار الأمن"
                                ],
                                reward: 60
                            }
                        ]
                    }
                },
                {
                    id: 8,
                    levelNumber: 8,
                    title: "تحديات المساعدة",
                    category: "أساعد غيري",
                    pillar: "empathy",
                    type: "real_world_challenge",
                    isExam: false,
                    description: "تطبيق عملي للمساعدة في الحياة الواقعية",
                    xpReward: 200,
                    starsAvailable: 3,
                    estimatedTime: "أسبوع",
                    content: {
                        challenges: [
                            {
                                id: "ch1",
                                title: "زيارة مريض",
                                description: "قم بزيارة قريب أو جار مريض",
                                proofType: "photo",
                                points: 100
                            },
                            {
                                id: "ch2",
                                title: "إطعام جائع",
                                description: "شارك في توزيع وجبات للمحتاجين",
                                proofType: "photo",
                                points: 150
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
