import React from "react";
import { CardTerm } from "./CardTerm";
import { Term } from "./types";

export interface CardProperties {
    terms: Term[]
    onClick?: any
}

export const Card = (props: CardProperties) => {
    const children = props.terms.map((term, index) => {
        return <CardTerm key={index} term={term} />
    });

    const classNames = ["card"]

    if (props.onClick) {
        classNames.push('clickable')
    }

    return (
        <div className={classNames.join(' ')} onClick={props.onClick}>
            {children}
        </div>
    )
}
