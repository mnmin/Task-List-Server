const lessonPlans = [];
const createLessonPLan = async (lesson, iterator) => {
  const newLessonPlan = await prisma.lessonPlan.create({
    data: {
      name: `Lesson Plan ${iterator}`,
      description: `Lesson plan ${iterator} description`,
      objectives: [
        `Objective 1 for lesson plan-${iterator} lesson-${lesson.id}`,
        `Objective 2 for lesson plan-${iterator} lesson-${lesson.id}`,
        `Objective 3 for lesson plan-${iterator} lesson-${lesson.id}`,
        `Objective 4 for lesson plan-${iterator} lesson-${lesson.id}`,
        `Objective 5 for lesson plan-${iterator} lesson-${lesson.id}`,
      ],
      createdBy: {
        connect: {
          id: teacherUser.id,
        },
      },
      createdFor: {
        connect: {
          id: users[2].id,
        },
      },
      lessons: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });
  return newLessonPlan;
};

for (let i = 1; i <= iterator; i++) {
  lessonPlans.push(await createLessonPLan(lessons[i - 1], i));
}
