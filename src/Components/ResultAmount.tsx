/* This example requires Tailwind CSS v2.0+ */
import { InformationCircleIcon } from '@heroicons/react/solid'
import React from "react";

interface props {
    amount: number
}

export default function ResultAmount(props:props) {
    return (
        <div className="rounded-md bg-blue-50 p-4 my-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">Ditemukan {props.amount} hasil pencarian</p>
                </div>
            </div>
        </div>
    )
}
