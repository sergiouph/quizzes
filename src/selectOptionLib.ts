import { Article, Quiz, Source, Term, Group, Option, Category } from "./types";

const WORST_CASE = 100

export interface OptionCase {
    isAnswer: boolean
    terms: Term[]
}

export interface QuizCase {
    question: OptionCase
    options: OptionCase[]
}

function collectArticles(groups: Group[]): Article[] {
    const result: Article[] = []

    for (const group of groups) {
        for (const article of group.articles) {
            result.push(article)
        }
    }
    return result
}

function containsAnyCategory(terms: Term[], categories: Category[]): boolean {
    for (const term of terms) {
        for (const category of categories) {
            if (term.category === category) {
                return true
            }
        }
    }
    return false
}

function selectArticle(articles: Article[], categories: Category[], categories2: Category[]): Article {
    for (let i = 0; i < WORST_CASE; i++) {
        const index = Math.floor(articles.length * Math.random())
        const article = articles[index]

        if (containsAnyCategory(article.terms, categories)) {
            if (categories2.length === 0) {
                return article
            }

            if (containsAnyCategory(article.terms, categories2)) {
                return article
            }
        }
    }
    
    throw new Error(`No article found`)
}

function selectOption(options: Option[]): Option {    
    const index = Math.floor(options.length * Math.random())
    return options[index]
}

function selectTerm(terms: Term[]): Term {    
    const index = Math.floor(terms.length * Math.random())
    return terms[index]
}

function buildOptionCase(option: Option, article: Article, isAnswer: boolean): OptionCase {
    const optionCase: OptionCase = {
        isAnswer,
        terms: []
    }

    for (const category of option.categories) {
        const categoryTerms: Term[] = []
        for (const term of article.terms) {
            if (term.category.id === category.id) {
                categoryTerms.push(term)
            }
        }
        
        if (categoryTerms.length > 0) {
            const term = selectTerm(categoryTerms)

            optionCase.terms.push(term)
        }
    }

    if (optionCase.terms.length === 0) {
        throw new Error(`Missing terms`)
    }

    return optionCase
}

function shuffle(a: any[]) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function toString(terms: Term[]): string {
    const items: string[] = []

    for (const term of terms) {
        items.push(term.value)
    }

    items.sort()

    return items.join('\n')
}

function collectCategories(options: Option[]): Category[] {
    const result: Category[] = []

    for (const option of options) {
        for (const category of option.categories) {
            if (result.indexOf(category) === -1) {
                result.push(category)
            }
        }
    }
    
    return result
}

export function generateQuizCase(quiz: Quiz): QuizCase {
    const qCategories = collectCategories(quiz.questions)
    const aCategories = collectCategories(quiz.answers)
    const articles = collectArticles(quiz.groups)
    const articleMain = selectArticle(articles, qCategories, aCategories)
    const question = selectOption(quiz.questions)
    const questionCase = buildOptionCase(question, articleMain, false)
    const optionCases: OptionCase[] = [
        buildOptionCase(selectOption(quiz.answers), articleMain, true)
    ];

    const visited = [articleMain]
    const selected: string[] = []

    while (optionCases.length < quiz.options) {
        const option = selectOption(quiz.answers)
        const oCategories = collectCategories([option])
        const articleCase = selectArticle(articles, oCategories, [])

        if (visited.indexOf(articleCase) === -1) {
            const optionCase = buildOptionCase(option, articleCase, false)
            const optionCaseStr = toString(optionCase.terms)

            if (selected.indexOf(optionCaseStr) == -1) {
                selected.push(optionCaseStr)

                optionCases.push(optionCase)

                visited.push(articleCase)
            }
        }
    }

    shuffle(optionCases)

    return { 
        question: questionCase, 
        options: optionCases,
    }
}