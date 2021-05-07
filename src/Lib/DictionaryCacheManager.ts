import {Dispatch} from "react";
import axios from "axios";
import LZUTF8 from "lzutf8";

enum KBBI {
    DICTIONARY = "KBBI-DICT",
    REVISION = "KBBI-REV",
    CACHED = "KBBI-CACHED",
    CACHED_YES = "Y"
}

const config = {
    kbbiRev : localStorage.getItem(KBBI.REVISION),
    kbbiLocal: localStorage.getItem(KBBI.DICTIONARY),
    kbbiPath: "kbbi.json"
}

const clearDictionaryCache = function () {
    localStorage.removeItem(KBBI.DICTIONARY);
    localStorage.removeItem(KBBI.REVISION);
    localStorage.removeItem(KBBI.CACHED);
}
const doCacheRoutine = function (currentVersion: string, setDictionaryLoaded: Dispatch<boolean>, setDictionary: Dispatch<any>) {
    if (cacheIsOld(currentVersion)) {
        console.warn('Dictionary mismatch / missing on LocalStorage, invalidating and redownloading dictionary now...');
        localStorage.removeItem(KBBI.DICTIONARY);

        axios.get(config.kbbiPath).then((res) => {
            if (localStorageSufficient()) {

                localStorage.setItem(KBBI.DICTIONARY, jsonCompress(res.data));
                localStorage.setItem(KBBI.REVISION, currentVersion);
                localStorage.setItem(KBBI.CACHED, KBBI.CACHED_YES);

                console.info('Dictionary cached for later use!');
            } else {
                console.warn('Insufficient storage, dictionary will not be cached!');
            }

            setDictionaryLoaded(true);
            setDictionary(res.data);
        });
    } else {
        console.info('Downloading from local cache...');
        setDictionary(jsonDecompress(config.kbbiLocal));
        setDictionaryLoaded(true);
    }
}

function jsonCompress(data : any) {
   return LZUTF8.compress(JSON.stringify(data), {outputEncoding: "StorageBinaryString"});
}

function jsonDecompress(data: string | null) {
    JSON.parse(LZUTF8.decompress(data, {inputEncoding: "StorageBinaryString"}))
}

function localStorageSufficient() {
    return 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length > 4500000
}

function cacheIsOld(version: string) {
    return config.kbbiRev === null || config.kbbiRev !== version || localStorage.getItem(KBBI.CACHED) !== KBBI.CACHED_YES
}

export {doCacheRoutine , clearDictionaryCache};