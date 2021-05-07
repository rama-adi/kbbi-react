import { clearDictionaryCache } from "../Lib/DictionaryCacheManager";
import { XCircleIcon } from '@heroicons/react/solid'
import React from "react";
export default function DevToolbox () {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
               <p className="text-red-900">Dev Mode</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-red-700">You've activated the devmode. This feature is only intended for debugging purpose. Proceed with caution</p>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="w-full my-4 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {clearDictionaryCache();  window.location.reload();}}
                >
                    Clear Dictionary Cache
                </button>
            </div>
        </div>
    )
}