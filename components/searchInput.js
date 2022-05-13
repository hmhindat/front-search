import { useEffect } from "react";

const SearchInput = ({onSubmit, auto, onOptionSubmit, isOnFocuse, onFocuse, notOnFocuse, text_to_query, trigger_selection, optionsData, simple, buttonText}) => {
    
    useEffect(() => {

    },[text_to_query, optionsData, isOnFocuse])

    
    return (
        <div className={`relative w-full flex flex-co items-center justify-start mt-2 bg-white ${simple && "shadow-softglow border-1 rounded-lg border-blue-300"} ${!simple && "shadow-softglow border-t-2 border-x-2 rounded-t-lg border-blue-300"}`}>
            <input
                className='w-full indent-3 focus:outline-none font-bold'
                type="text"
                name="search"
                placeholder='Search'
                onFocus={() => onFocuse()}
                onBlur={() => notOnFocuse()}
                value={text_to_query}
                onInput={trigger_selection}
                autoComplete="off"
            />
            <button
                className='hover:bg-blue-300 bg-red-00 hover:text-white border-1 rounded-sm border-gray-100 w-2/12 h-6 opacity-75'
                type="submit"
                value={text_to_query}
                onClick={onSubmit}
            >{buttonText || "RUN"}</button>
            { auto && <div className='absolute top-full left-0 flex flex-col h-auto w-10/12  border-1 opacity-70 bg-gradient-to-b from-white to-gray-200 ' >
                {isOnFocuse && optionsData.ready && optionsData.autoCompleteOptions.map((text, indx) => (
                    <div key={indx} className="flex justify-start items-center text-gray-900 text-xl w-full bg-opacity-50 hover:bg-green-300  cursor-default " value={text} onMouseDown={e => onOptionSubmit(e, text)} >{text}</div>
                ))}
            </div>}
        </div>
    )
}
export default SearchInput;