import React, {useState, Fragment, useEffect} from 'react';
import LoadingDictionary from "./Components/LoadingDictionary";
import OctoFork from "./Components/OctoFork";
import NoResults from "./Components/NoResults";
import ResultAmount from "./Components/ResultAmount";
import {Transition, Switch} from '@headlessui/react';
import {CheckCircleIcon, SearchIcon} from '@heroicons/react/outline';
import {XIcon, ClipboardCopyIcon, CheckIcon} from '@heroicons/react/solid';
import { doCacheRoutine } from "./Lib/DictionaryCacheManager";
import useCookie from 'react-use-cookie';
import DevToolbox from "./Components/DevToolbox"
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';


const KBBI_VER = "4 / 2008";

interface dictionaryFormat {
    w: string,
    d: string
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

function filterItems(arr: any, query: string) {
    return arr.filter(function (el: dictionaryFormat) {
        return el.w.toLowerCase().startsWith(query.toLowerCase())
    })
}

function App() {
    const [dictionary, setDictionary] = useState([]);
    const [dictionaryLoaded, setDictionaryLoaded] = useState(false);
    const [devmode] = useCookie('KBBI_DEVMODE', 'false');
    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedNum, setCopiedNum] = useState<any>(null);
    const [liveSearch, setLiveSearch] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        doCacheRoutine(KBBI_VER, setDictionaryLoaded, setDictionary);
    }, []);


    useEffect(() => {
        if (liveSearch) {
            setResults(search === "" ? [] : filterItems(dictionary, search).sort((a: any, b: any) => b.w.length - a.w.length))
        }
    }, [dictionary, liveSearch, search]);

    function doCopy(indexNo: number) {

        setCopied(true);
        setCopiedNum(indexNo);

        setTimeout(() => {
            setCopied(false);
            setCopiedNum(null);
        }, 2000)
    }

    return (
        <>
            <OctoFork/>
            <LoadingDictionary show={!dictionaryLoaded}/>
            {dictionaryLoaded &&
            <div>
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
                            <div
                                className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true"/>
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-gray-900">Teks di copy!</p>
                                            <p className="mt-1 text-sm text-gray-500">Teks yang kamu pilih sudah
                                                tercopy!</p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex">
                                            <button
                                                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => {
                                                    setCopied(false)
                                                }}
                                            >
                                                <span className="sr-only">Close</span>
                                                <XIcon className="h-5 w-5" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="max-w-7xl w-full mt-4 sm:mx-4">
                        <div className="bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Instant KBBI Dictionary</h3>
                                <div className="mt-2 max-w-xl text-sm text-gray-500">
                                    <p>Revisi kamus: v{KBBI_VER} &middot; Silakan ketik apa yang ingin anda cari...</p>
                                </div>

                                {liveSearch &&
                                <div className="w-full my-4">
                                    <label htmlFor="liveSearchbox" className="sr-only">
                                        Kata yang ingin dicari
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </div>
                                        <input
                                            value={search}
                                            autoComplete="off"
                                            onChange={(e: any) => setSearch(e.target.value)}
                                            type="text"
                                            id="liveSearchbox"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Cari di kamus KBBI"
                                        />
                                    </div>
                                </div>
                                }

                                {!liveSearch &&
                                <form onSubmit={(e) => {
                                    setResults(search === "" ? [] : filterItems(dictionary, search).sort((a: any, b: any) => b.w.length - a.w.length));
                                    e.preventDefault();
                                }} className="w-full my-4">
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <label htmlFor="searchbox" className="sr-only">
                                            Kata yang ingin dicari
                                        </label>
                                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                            <div
                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                            </div>
                                            <input
                                                value={search}
                                                onChange={(e: any) => setSearch(e.target.value)}
                                                type="text"
                                                autoComplete="off"
                                                id="searchbox"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                                placeholder="Cari di kamus KBBI"
                                            />
                                        </div>
                                        <button
                                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                            <span>Cari!</span>
                                        </button>
                                    </div>
                                </form>
                                }

                                <Switch.Group as="div" className="flex items-center justify-between">
                                    <Switch.Label as="span" className="flex-grow flex flex-col" passive>
                                        <span className="text-sm font-medium text-gray-900">Live search</span>
                                        <span className="text-sm text-gray-500">Langsung cari kata yang diketik. Performa mungkin lambat saat mengetik.</span>
                                    </Switch.Label>
                                    <Switch
                                        checked={liveSearch}
                                        onChange={setLiveSearch}
                                        className={classNames(
                                            liveSearch ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        )}
                                    >
                                        <span className="sr-only">live search</span>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                liveSearch ? 'translate-x-5' : 'translate-x-0',
                                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                            )}
                                        />
                                    </Switch>
                                </Switch.Group>
                            </div>
                        </div>

                        {devmode === "true" &&
                        <div className="my-4">
                            <DevToolbox />
                        </div>
                        }

                        <div className="mt-4">
                            <p>
                                {
                                    search === ""
                                        ? `Anda belum mencari apapun!`
                                        : `Pencarian anda ${search}`
                                }
                            </p>
                            <p className="mt-4">Hasil:</p>
                            <div>
                                {results.length === 0
                                    ? <NoResults searched={search !== ""}/>
                                    : <ResultAmount amount={results.length}/>
                                }
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {results.map((i: any, index: number) => (
                                    <CopyToClipboard key={index} text={i.w}
                                                     onCopy={() => doCopy(index)}>
                                        <div
                                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <div
                                                className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                {copiedNum === index ?
                                                    <CheckIcon className="h-5 w-5 text-indigo-900"/> :
                                                    <ClipboardCopyIcon className="h-5 w-5 text-indigo-900"/>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <a href="#" className="focus:outline-none">
                                                    <span className="absolute inset-0" aria-hidden="true"/>
                                                    <p className="text-sm font-medium text-gray-900">{i.w}</p>
                                                    <p className="text-sm text-gray-500">{i.d}</p>
                                                </a>
                                            </div>
                                        </div>
                                    </CopyToClipboard>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default App;
