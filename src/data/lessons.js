import { geneticsLessons, finalExamQuestions } from './geneticsLessons'

const selectEssentialObjectives = (lesson) =>
  [...new Set(lesson.topics.flatMap((topic) => topic.objectives))].slice(0, 3)

export const lessons = geneticsLessons.map((lesson) => ({
  ...lesson,
  objectives: selectEssentialObjectives(lesson),
  topics: lesson.topics.map((topic) => ({
    ...topic,
    activity_type: topic.activity_type || lesson.activity_type,
    activity_url: topic.activity_url || lesson.activity_url,
    activity_title: topic.activity_title || lesson.activity_title
  }))
}))

export const pretests = Object.fromEntries(
  lessons.map((lesson) => [
    lesson.id,
    lesson.pretest.map((item) => ({
      q: item.question,
      options: item.options,
      answer: item.answer
    }))
  ])
)

export const finalExam = finalExamQuestions.map((item) => ({
  q: item.question,
  options: item.options,
  answer: item.answer
}))

export const getLessonById = (lessonId) =>
  lessons.find((lesson) => lesson.id === Number(lessonId))

export const getTopicById = (lessonId, topicId) => {
  const lesson = getLessonById(lessonId)
  return lesson?.topics.find((topic) => topic.id === Number(topicId))
}
