import { useEffect, useState } from 'react'
import Eye from '../components/Eye'
import Title from './Title'
import FieldsBox from './FieldsBox'
import SearchInput from './searchInput'

const search_url = 'http://localhost:3003/search'



const ResultView = ({ title, obj, prioKeys, focused, fadeIn, fadeOut }) => {
    let fields_to_show = []

    
    for (let key in prioKeys)
        if (key in obj)
            fields_to_show.push(key)

    for (let field in obj) {
        if (fields_to_show.length < 3 && !(prioKeys.includes(field)))
            fields_to_show.push(field)
    }

    return (
        <div className={` overflow-hidden ${focused ? ` ${fadeIn && " transition-opacity duration-1000 opacity-0 "}` : `${fadeOut && " transition-opacity duration-1000 opacity-100 "}`}  flex flex-col justify-center items-start  top-0 left-0 w-full h-full p-4`}>
            <Title customizedStyle="text-2xl font-bold w-1/3 h-1/5 text-white" title={title} />
            <div className="flex flex-col justify-start items-center w-10/12 h-4/5  rounded-md overflow-scroll ">
                {fields_to_show.map((field, idx) => {

                    return (<div key={idx} className=" flex w-full flex-row justify-between items-start text-white">
                        <lable className="mx-2 w-1/3 overflow-hidden">{field} : </lable>
                        <lable className="mx-2  w-2/3 overflow-hidden">{obj[field]}</lable>
                        </div>)

                }  )}
            </div>
        </div>
    )
}

const BoxSearch = ({ field, focused, tlwcss_width, tlwcss_height, onSubmit }) => {
    const [text_to_query, setText_to_query] = useState("")
    const [onLoad, setOnLoad] = useState(false)
    const [fetchedData, setFetchedData] = useState({autoCompleteOptions : [], ready : false})
    const [isOnFocuse, setIsOnFocuse] = useState(true)


    useEffect(() => {
        console.log("starting use effect")
        if (!onLoad && field && field != "")
        {
            console.log("starting fetch")
            setOnLoad(true)
            let query_url = search_url + "?query=" + text_to_query
            console.log(`input query : ${query_url}`)
            fetch(query_url,{
                method : 'GET',
                headers : { 'Content-Type': 'application/json' }
            }).then(query_res => {
                let ready = (query_res.length > 0) ? true : false 
                // let ready = (query_res && Object.keys(query_res.matching_names) == 0) ? false: true
                // console.log("AUTO ATO fetched data : ", query_res.target_text, "readyyyyyyyyyyyyyyyyyy :", ready)
                // setAutoCompleteOptions(query_res.data.target_text)
                let list_of_text = []
                if (query_res.length > 0)
                {
                    query_res.forEach(elem => {
                        list_of_text.push(elem.formated_text.text_to_query)
                    });
                }
                setFetchedData({
                    autoCompleteOptions : list_of_text,
                    ready : ready
                })
                setOnLoad(false)
            })
        }
    },[text_to_query, fetchedData, isOnFocuse])



    const trigger_selection = (e) => {
        if (!onLoad)
        {
            if (text_to_query != e.target.value)
                setText_to_query(e.target.value)
        }
    }

    const onAutoOptionClick = (e, txt) => {
        if (e.target.value != "" && !onLoad)
        {
            // setText_to_query(e.target.value)
            setFetchedData({...fetchedData, autoCompleteOptions : []})
            // e.target.value = txt
            onSubmit(txt)
        }
    }

    const onFocuse = () => {
        console.log("onFocuse")
        setIsOnFocuse(true)
    }
    
    const notOnFocuse = () => {
        console.log("Not onFocuse")
        setIsOnFocuse(false)
    }

    return (
        <div className={`z-50 relative flex items-end justify-around bg-gradient-to-t from-blue-700 via-black to-black rounded-b-full ${tlwcss_width || " w-full "} ${tlwcss_height || " h-auto "}`}>
            {/* <div className='absolute left-0 top-0 w-2/3 h-full flex flex-row items-center justify-between bg-gr400'>
                <ResultView title="hit info" obj={fetchedData.ready && fetchedData.data.searchInfo.value != 0 && fetchedData.data.target_hits[0]} prioKeys={[]} focused={focused} fadeIn fadeOut />
                <ResultView title="hit source" obj={fetchedData.ready && fetchedData.data.searchInfo.value != 0 && fetchedData.data.target_hits[0].source} prioKeys={[]} focused={focused} fadeIn fadeOut />
            </div> */}
            {/* <FieldsBox/> */}
            <div className={` flex flex-col items-center justify-center w-1/3 ${(focused && " duration-1000 translate-x-0 ") || " duration-1000 translate-x-full "}`}>
                <Eye onDisplay={true} darkTheme={true} />
                <Title title="Box Search" blueAtFirst />
                <SearchInput
                    onSubmit={onSubmit}
                    onOptionSubmit={onAutoOptionClick}
                    isOnFocuse={isOnFocuse}
                    onFocuse={onFocuse}
                    notOnFocuse={notOnFocuse}
                    text_to_query={text_to_query}
                    trigger_selection={trigger_selection}
                    optionsData={fetchedData}
                    auto
                />
            </div>
                            
    </div>
)
}

export default BoxSearch