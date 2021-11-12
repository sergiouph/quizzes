import { Article, Category, Group, Option, Quiz, QuizType, Source, Term } from "./types";

function str(data: any): string {
    if (data) {
        return String(data)
    }
    return ''
}

function num(data: any): number {
    if (data) {
        return Number(data)
    }
    return 0
}

function strOp(data: any): (string | undefined) {
    if (data) {
        return String(data)
    }
    return undefined
}

function quizType(id: string): QuizType {
    if (QuizType.SELECT_OPTION === id) {
        return QuizType.SELECT_OPTION
    }

    throw new Error(`Invalid quiz type: ${id}`)
}

function findCategory(id: string, categories: Category[]): Category {
    for (const category of categories) {
        if (category.id === id) {
            return category
        }
    }

    throw new Error(`Category not found: ${id}`)
}

function buildOption(option: string, categories: Category[]): Option {
    const ids = option.split(' ')
    const result: Option = {
        categories: []
    }

    for (const id of ids) {
        const category = findCategory(id, categories)

        result.categories.push(category)
    }

    return result
}

function buildOptions(options: string[], categories: Category[]): Option[] {
    const result: Option[] = []

    for (const option of options) {
        result.push(buildOption(option, categories))
    }

    return result
}

function findGroup(id: string, groups: Group[]): Group {
    for (const group of groups) {
        if (group.id === id) {
            return group
        }
    }

    throw new Error(`Group not found: ${id}`);
}

function findGroups(ids: string[], groups: Group[]): Group[] {
    const result: Group[] = []

    for (const id of ids) {
        result.push(findGroup(id, groups));
    }

    return result
}

export function buildSource(sourceData: any): Source {
    const quizzes: Quiz[] = []
    const categories: Category[] = []
    const groups: Group[] = []

    for (const categoryData of sourceData['categories']) {
        categories.push({
            id: str(categoryData['id']),
            name: str(categoryData['name']),
            description: strOp(categoryData['description']),
        })
    }

    for (const groupData of sourceData['groups']) {
        const articles: Article[] = []

        for (const articleData of groupData['articles']) {
            const terms: Term[] = []
            const orders: Map<string, number> = new Map

            for (const termData of articleData['terms']) {
                const categoryId = str(termData['category'])
                const order = orders.get(categoryId) || 1;
                terms.push({
                    value: str(termData['value']),
                    category: findCategory(categoryId, categories),
                    order,
                })

                orders.set(categoryId, order + 1)
            }

            articles.push({
                id: str(articleData['id']),
                terms,
            })
        }

        groups.push({
            id: str(groupData['id']),
            name: str(groupData['name']),
            description: strOp(groupData['description']),
            articles,
        })
    }

    for (const quizData of sourceData['quizzes']) {
        quizzes.push({
            id: str(quizData['id']),
            name: str(quizData['name']),
            type: quizType(quizData['type']),
            groups: findGroups(quizData['groups'], groups),
            questions: buildOptions(quizData['questions'], categories),
            answers: buildOptions(quizData['answers'], categories),
            options: num(quizData['options'])
        })
    }

    return {
        quizzes,
        categories,
        groups,
    }
}