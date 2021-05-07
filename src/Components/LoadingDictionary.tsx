interface loadingInterface {
    show: boolean
}

export default function LoadingDictionary(props: loadingInterface) {
    return (
       <>
           {
               props.show && <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                       <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Kamus loading...</h2>
                           <p className="mt-2 text-center text-sm text-gray-600">
                               Mohon tunggu, kamus sedang di inisialisasi. Loading akan lebih cepat setelah download pertama...
                           </p>
                       </div>
                   </div>
               </div>
           }
       </>
    )
}