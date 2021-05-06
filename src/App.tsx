import React, {useState, Fragment} from 'react';
import dictionary from "./kbbi-db.json";
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon, ClipboardCopyIcon, CheckIcon } from '@heroicons/react/solid'
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface dictionaryFormat {
    w: string,
    d: string
}

function App() {
    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedNum, setCopiedNum] = useState<any>(null);

    function filterItems(arr: any, query: string) {
        return arr.filter(function (el: dictionaryFormat) {
            return el.w.toLowerCase().startsWith(query.toLowerCase())
        })
    }

    function doCopy(indexNo:number) {

        setCopied(true);
        setCopiedNum(indexNo);

        setTimeout(()=> {
            setCopied(false);
            setCopiedNum(null);
        }, 2000)
    }

    const results = search === "" ? [] : filterItems(dictionary, search).sort((a: any, b: any) => b.w.length - a.w.length);

    return (
        <>

            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={copied}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Teks di copy!</p>
                                        <p className="mt-1 text-sm text-gray-500">Teks yang kamu pilih sudah tercopy!</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setCopied(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <div className="mx-8 mt-4">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Mencari KBBI</h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>Silakan ketik apa yang ingin anda cari...</p>
                        </div>
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="searchbox" className="sr-only">
                                Kata yang ingin dicari
                            </label>
                            <input
                                value={search}
                                onChange={(e: any) => setSearch(e.target.value)}
                                type="text"
                                id="searchbox"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Misal: andai"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <p>Pencarian anda: {search} / {results.length} hasil pencarian</p>
                    <p>Hasil:</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {results.map((i: any, index:number) => (
                            <CopyToClipboard text={i.w}
                                             onCopy={() => doCopy(index)}>
                                <div
                                    key={index}
                                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        {copiedNum === index ? <CheckIcon className="h-5 w-5 text-indigo-900" /> : <ClipboardCopyIcon className="h-5 w-5 text-indigo-900" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <a href="#" className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            <p className="text-sm font-medium text-gray-900">{i.w}</p>
                                            <p className="text-sm text-gray-500 truncate">{i.d}</p>
                                        </a>
                                    </div>
                                </div>
                            </CopyToClipboard>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
