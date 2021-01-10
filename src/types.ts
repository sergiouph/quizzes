export enum QuizType {
    SELECT_OPTION = 'select-option'
}

export interface Term {
    category: Category;
    value: string;
}

export interface Article {
    id: string;
    terms: Term[];
}

export interface Group {
    id: string;
    name: string;
    description?: string;
    articles: Article[];
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface Option {
    categories: Category[];
}

export interface Quiz {
    name: string;
    description?: string;
    type: QuizType;
    groups: Group[];
    questions: Option[];
    answers: Option[];
    options: number;
}

export interface Source {
    quizzes: Quiz[];
    categories: Category[];
    groups: Group[];
}