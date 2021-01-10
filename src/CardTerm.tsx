import React from "react";
import { Term } from "./types";

export interface CardTermProperties {
    term: Term
}

export const CardTerm = (props: CardTermProperties) => {
    return (
        <div className="card-term">
            <span title={props.term.category.name}>
                {props.term.value}
            </span>
        </div>
    )
}
