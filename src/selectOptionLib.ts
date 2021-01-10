import { Article, Quiz, Source, Term, Group, Option } from "./types";

export interface OptionCase {
    isAnswer: boolean
    terms: Term[]
}

export interface QuizCase {
    question: OptionCase
    options: OptionCase[]
}

function selectArticles(groups: Group[]): Article[] {
    const result: Article[] = []

    for (const group of groups) {
        for (const article of group.articles) {
            result.push(article)
        }
    }

    // TODO consider selected articles contain specific categories to avoid errors
    return result
}

function selectArticle(articles: Article[]): Article {    
    const index = Math.floor(articles.length * Math.random())
    return articles[index]
}

function selectOption(options: Option[]): Option {    
    const index = Math.floor(options.length * Math.random())
    return options[index]
}

function buildOptionCase(option: Option, article: Article, isAnswer: boolean): OptionCase {
    const optionCase: OptionCase = {
        isAnswer,
        terms: []
    }

    for (const category of option.categories) {
        let missing = true
        for (const term of article.terms) {
            if (term.category.id === category.id) {
                optionCase.terms.push(term)
                missing = false
            }
        }
        if (missing) {
            throw new Error(`Category not found ${category.id} in article ${article.id}`)
        }
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

export function generateQuizCase(quiz: Quiz): QuizCase {
    const articles = selectArticles(quiz.groups)
    const articleMain = selectArticle(articles)
    const question = selectOption(quiz.questions)
    const questionCase = buildOptionCase(question, articleMain, false)
    const optionCases: OptionCase[] = [
        buildOptionCase(selectOption(quiz.answers), articleMain, true)
    ];

    const visited = [articleMain]

    while (optionCases.length < quiz.options) {
        const articleCase = selectArticle(articles)

        if (visited.indexOf(articleCase) === -1) {
            optionCases.push(
                buildOptionCase(selectOption(quiz.answers), articleCase, false)
            )

            visited.push(articleCase)
        }
    }

    shuffle(optionCases)

    return { 
        question: questionCase, 
        options: optionCases,
    }
}