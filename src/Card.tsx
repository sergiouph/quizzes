import React, { useEffect, useState } from "react";
import { CardTerm } from "./CardTerm";
import { Term } from "./types";

export type BooleanSupplier = () => boolean
export type Action = () => void

export interface CardProperties {
    terms: Term[]
    onSelected?: Action
    status?: boolean
}

export const Card = (props: CardProperties) => {
    const children = props.terms.map((term, index) => {
        return <CardTerm key={index} term={term} />
    });

    const classNames = ["card"]

    if (props.onSelected) {
        classNames.push('clickable')
    }

    if (props.status !== undefined) {
        if (props.status) {
            classNames.push('success')
        }
        else {
            classNames.push('failure')
        }
    }

    return (
        <div className={classNames.join(' ')} onClick={props.onSelected}>
            {children}
        </div>
    )
}
