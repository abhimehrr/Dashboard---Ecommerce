import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Reducers
import { addToFav, removeFromFav } from './store/ProductReducer'


function App() {
  const pageItem = 10
  const [page, setPage] = useState(1)

  const { products } = useSelector(state => state.products)
  const dispatch = useDispatch()
  
  const [search, setSearch] = useState(false) 
  const [searchQuery, setSearchQuery] = useState('') 
  const [searchedItem, setSearchedItem] = useState([])

  const handleSearch = e => {
    var q = e.target.value
    setSearchQuery(q)

    if(q.length < 1) return setSearchedItem([])

    var Temp = products.filter(item => item.title.toLowerCase().includes(q.toLowerCase()))
    setSearchedItem(Temp)
  }


  const handleNext = () => {
    if(Math.ceil(products.length/pageItem)<=page) return
    setPage(pre=>pre+1)
  }
  
  const handleBack = () => {
    if(page <= 1) return
    setPage(pre=>pre-1)
  }
  

  return (
    search ? 
    <div className="w-screen min-h-screen absolute top-0 left-0 z-50 bg-gray-200 py-2 px-4">
      <div className="w-4/5 flex items-center gap-2 bg-gray-100 mt-4 mx-auto py-2 px-4 rounded-lg">
        <label htmlFor="search" className="text-xl cursor-pointer">
          <i className="fa-solid fa-search"></i>
        </label>
        <input autoFocus value={searchQuery} onChange={handleSearch} type="text" className="w-full border-none outline-none bg-transparent py-1 px-2 text-base" id="search" placeholder="Search..." />
        <div onClick={()=>{setSearch(false);setSearchQuery('');setSearchedItem([])}} className="font-medium text-xl cursor-pointer px-2 py-0.5 hover:bg-gray-200 rounded transition-all">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="w-4/5 flex items-start flex-wrap gap-4 bg-gray-100 my-4 mx-auto p-4 rounded-lg">
        {searchedItem.length < 1 ?
        <span className="font-medium text-gray-700 tracking-wide">
          Result will be shown here...
        </span>
        :
        searchedItem.map(item => (
          <div key={item.id} className="w-36 p-4 hover:bg-gray-200 cursor-pointer bg-white transition-all rounded">
            <div className="w-full bg-slate-100 aspect-square" style={{objectFit: 'cover'}}>
              <img className="" style={{objectFit: 'cover'}} src={item.thumbnail} alt={item.title} />
            </div>
            <div className="relative">
              <div className="my-1">{item.title}</div>
              <div className="font-medium">$ {item.price}</div>
              <div className="absolute right-1 bottom-0">
                {item.isFav ? 
                  <i className="fa-solid fa-heart"></i>
                  :
                  <i className="fa-regular fa-heart"></i>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    :
    <div className="w-11/12 flex flex-col justify-center my-4 mx-auto">
      <div className="text-gray-700 text-2xl font-bold mb-4 text-center">
        Dashboard
      </div>
      <div onClick={()=>setSearch(true)} className="w-full flex items-center gap-2 bg-gray-200 py-2 px-4 rounded">
        <label htmlFor="search" className="text-xl cursor-pointer">
          <i className="fa-solid fa-search"></i>
        </label>
        <input onChange={handleSearch} type="text" className="w-full border-none outline-none bg-transparent py-1 px-2 text-base" id="search" placeholder="Search..." />
      </div>
      
      <div className="flex items-center flex-wrap gap-4 my-4 bg-gray-100 py-4 px-8 rounded">
        {products.slice((page * pageItem) - pageItem, page * pageItem).map(item => (
          <div key={item.id} className="w-40 p-4 hover:bg-gray-200 cursor-pointer bg-white transition-all rounded">
            <div className="w-full bg-slate-100 aspect-square" style={{objectFit: 'cover'}}>
              <img className="w-full h-full object-cover" src={item.thumbnail} alt={item.title} />
            </div>
            <div className="relative">
              <div className="my-1">{item.title}</div>
              <div className="font-medium">$ {item.price}</div>
              <div className="absolute right-1 bottom-0">
                {item.isFav ? 
                  <i onClick={()=>dispatch(removeFromFav(item.id))} className="fa-solid fa-heart"></i>
                  :
                  <i onClick={()=>dispatch(addToFav(item.id))} className="fa-regular fa-heart"></i>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <button onClick={handleBack} className={`w-8 h-8 ${page<=1&&'cursor-not-allowed'} flex items-center justify-center bg-gray-200 hover:bg-gray-400 rounded transition-all`}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="h-8 px-3 gap-2 flex items-center justify-center bg-gray-200 rounded">
          <label htmlFor="select">Jump to the page : </label>
          <select value={page} onChange={e=>setPage(parseInt(e.target.value))} id="select" className="px-2 cursor-pointer">
            {[...Array(Math.ceil(products.length/pageItem))].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>
        <button onClick={handleNext} className={`w-8 h-8 ${Math.ceil(products.length/pageItem)<=page&&'cursor-not-allowed'} flex items-center justify-center bg-gray-200 hover:bg-gray-400 rounded transition-all`}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
