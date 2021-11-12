import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import { Article, Category, Group, Quiz, Source, Term } from "./types";

export interface LibraryProperties {
  source: Source
}

interface CategoryTerms {
    category: Category
    terms: Term[]
}

function createCategoryTerms(terms: Term[], categories: Category[]): CategoryTerms[] {
    const result: CategoryTerms[] = []

    for (const category of categories) {
        const categoryTerms: Term[] = []

        for (const term of terms) {
            if (term.category === category) {
                categoryTerms.push(term)
            }
        }

        if (categoryTerms.length > 0) {
            result.push({
                category,
                terms: categoryTerms,
            })
        }
    }

    return result
}

export function Library(props: LibraryProperties) {
    const categories = props.source.categories
    return (
        <div className="library">
            <h1>Library</h1>
            <div className="groups">
            {props.source.groups.map((group, groupKey) => {
                return (
                    <div key={groupKey} className="group">
                        <div className="group-id">{group.id}</div>
                        <div className='group-name'>{group.name}</div>
                        <div className="group-description">{group.description}</div>
                        <div className="articles">
                        {group.articles.map((article, articleKey) => {
                            const categoryTerms = createCategoryTerms(article.terms, categories)
                            return (
                                <div key={articleKey} className="article">
                                    <div className="article-id">{article.id}</div>
                                    <div className="terms">
                                    {categoryTerms.map((cterms, ctermKey) => {
                                        return (
                                            <div key={ctermKey} className="category">
                                                <div className="category-name">{cterms.category.name}</div>
                                                <div className="category-terms">
                                                {cterms.terms.map((term, termKey) => {
                                                    return (
                                                        <div key={termKey} className="term">
                                                            <div className="term-order">{term.order}</div>
                                                            <div className="term-value">{term.value}</div>
                                                        </div>
                                                    )
                                                })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}


