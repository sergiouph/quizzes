import { Quiz, Source } from "./types";

export function findQuiz(id: string, source: Source): Quiz {
    for (const quiz of source.quizzes) {
        if (quiz.id === id) {
            return quiz
        }
    }

    throw new Error(`Quiz not found: ${id}`);
}