import React, {useState} from 'react';
import dictionary from "./kbbi-db.json";


function App() {
    const [search, setSearch] = useState("");

    function filterItems(arr:any, query:string) {
        return arr.filter(function(el:any) {
            return el.w.toLowerCase().startsWith(query.toLowerCase())
        })
    }

   const results = search === "" ? [] : filterItems(dictionary, search).sort((a:any, b:any) => b.w.length - a.w.length);

    return (
        <div className="mx-8 mt-4">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Mencari KBBI</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Silakan ketik apa yang ingin anda cari...</p>
                    </div>
                    <form className="mt-5 sm:flex sm:items-center">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="searchbox" className="sr-only">
                                Email
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
                    </form>
                </div>
            </div>

            <div className="mt-4">
                <p>Pencarian anda: {search} / {results.length} hasil pencarian</p>
                <p>Hasil:</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {results.map((i: any) => (
                        <div
                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">{i.w}</p>
                                    <p className="text-sm text-gray-500 truncate">{i.d}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
