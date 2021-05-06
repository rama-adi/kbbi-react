import React, {useState, Fragment, useEffect} from 'react';
import dictionary from "./kbbi-db.json";
import {Transition, Switch} from '@headlessui/react'
import {CheckCircleIcon, SearchIcon} from '@heroicons/react/outline'
import {XIcon, ClipboardCopyIcon, CheckIcon} from '@heroicons/react/solid'
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface dictionaryFormat {
    w: string,
    d: string
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

function App() {
    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedNum, setCopiedNum] = useState<any>(null);
    const [liveSearch, setLiveSearch] = useState(false);
    const [results, setResults] = useState([]);

    function filterItems(arr: any, query: string) {
        return arr.filter(function (el: dictionaryFormat) {
            return el.w.toLowerCase().startsWith(query.toLowerCase())
        })
    }

    useEffect(() => {
        if (liveSearch) {
            setResults(search === "" ? [] : filterItems(dictionary, search).sort((a: any, b: any) => b.w.length - a.w.length))
        }
    }, [liveSearch, search])

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
            <div>
                <a href="https://github.com/rama-adi/kbbi-react" className="github-corner"
                   aria-label="View source on GitHub">
                    <svg width={80} height={80} viewBox="0 0 250 250"
                         style={{fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0}}
                         aria-hidden="true">
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
                        <path
                            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                            fill="currentColor" style={{transformOrigin: '130px 106px'}} className="octo-arm"/>
                        <path
                            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                            fill="currentColor" className="octo-body"/>
                    </svg>
                </a>
                <style
                    dangerouslySetInnerHTML={{__html: ".github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}"}}/>
            </div>

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
                <div className="max-w-7xl w-full mt-4">
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Mencari KBBI</h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>Silakan ketik apa yang ingin anda cari...</p>
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

                    <div className="mt-4">
                        <p>
                            {
                                search === ""
                                    ? `Anda belum mencari apapun!`
                                    : `Pencarian anda ${search}`
                            }
                        </p>
                        <p className="mt-4">Hasil:</p>
                        <p className="mt-2">
                            {results.length === 0
                                ? `Tidak ada hasil.`
                                : `${results.length} hasil pencarian`
                            }
                        </p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {results.map((i: any, index: number) => (
                                <CopyToClipboard text={i.w}
                                                 onCopy={() => doCopy(index)}>
                                    <div
                                        key={index}
                                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <div
                                            className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            {copiedNum === index ? <CheckIcon className="h-5 w-5 text-indigo-900"/> :
                                                <ClipboardCopyIcon className="h-5 w-5 text-indigo-900"/>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <a href="#" className="focus:outline-none">
                                                <span className="absolute inset-0" aria-hidden="true"/>
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
            </div>
        </>
    );
}

export default App;
