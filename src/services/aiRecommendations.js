import { shouldRecommendAI } from '../data/instructionalFlow'

export { shouldRecommendAI }

export function buildLessonAIContext({ lesson, topic, phase, learningObjective, studentResponse, simulationResult }) {
  return {
    lessonId: lesson?.id ?? null,
    topicId: topic?.id ?? null,
    lessonTitle: lesson?.title ?? null,
    topicTitle: topic?.title ?? null,
    phase: phase ?? null,
    learningObjective: learningObjective ?? null,
    studentResponse: studentResponse ?? null,
    simulationResult: simulationResult ?? null,
    assessmentState: 'lesson'
  }
}
