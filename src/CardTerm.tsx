import React from "react";
import { Term } from "./types";

export interface CardTermProperties {
    term: Term
}

export const CardTerm = (props: CardTermProperties) => {
    return (
        <div className="card-term">
            <div className="term-value">
                {props.term.value}
            </div>
            <div className="term-info">
                <div className="term-category">
                    {props.term.category.name}
                </div>
                &nbsp;
                <div className={`term-order order-${props.term.order}` }>
                    {props.term.order}
                </div>
            </div>
        </div>
    )
}
