import {ExclamationIcon} from '@heroicons/react/solid'
import React from "react";

interface props {
    searched?: boolean
}

export default function NoResults(props: props) {
    return (
        <>
            {(props.searched === null || props.searched) === false &&
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Anda belum mencari apapun. ketik sesuatu di bilah pencarian. bila anda menonaktifkan mode live, silakan klik cari!
                        </p>
                    </div>
                </div>
            </div>
            }

            {props.searched === true &&
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Entri tidak ditemukan di kamus
                        </p>
                    </div>
                </div>
            </div>
            }
        </>
    )
}