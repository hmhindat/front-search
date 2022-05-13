import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Chip } from "@material-ui/core";
import SearchInput from './searchInput'
import FieldsBox from './FieldsBox';
import BoxSearch from './BoxSearch';
import { useState, useReducer, useEffect } from 'react';


const search_url = 'http://localhost:3001/api/spacs' // "/getByfields?fields=["name", "sponsors", "address"]&q="exemple" "

const styleText = {
    hard : (text_elem, text_l, text_r) => <>{text_l}<span className='text-2xl font-bold' >{text_elem}</span>{text_r}</>,
    normie : (text_elem, text_l, text_r) => <>{text_l}<span className='text-2xl font-normal' >{text_elem}</span>{text_r}</>,
    thin : (text_elem, text_l, text_r) => <>{text_l}<span className='text-2xl font-thin' >{text_elem}</span>{text_r}</>,
}

const IndexOptions = [
    { id : 0, title: "spacs", interpret_res: (best_match, notNeeded) =>  styleText.normie(styleText.hard(best_match), "", " is a spac name.")  },
    { id : 1, title: "sponsors", interpret_res: (best_match, matching_spacName) =>  styleText.normie( styleText.thin(" is a sponsor of ") , styleText.hard(best_match),  styleText.hard(matching_spacName))},
    { id : 2, title: "directors", interpret_res: (best_match, matching_spacName) => styleText.normie( styleText.thin(" is the director of ") , styleText.hard(best_match),  styleText.hard(matching_spacName))}
]


const ShowResult = ({list, matched_data, query}) => {
    const MatchingElem  = ({text, matched_text}) => {
        
        let list_of_text_tokens = text.split(" ")
        let lowerCase_list_of_tokens = matched_text.toLowerCase()
        lowerCase_list_of_tokens = lowerCase_list_of_tokens.split(" ")
        let list_of_tokens = matched_text.split(" ")
        let pref = query.split(" ")
        // prefix in query => ex : "xxx aa" (aa is the prefix)
        pref = pref[pref.length - 1]

        return (
            <>
                {list_of_text_tokens.map(token => {
                    if (lowerCase_list_of_tokens.indexOf(token.toLowerCase()) > -1)
                        return <span className='text-xl font-bold text-gray-900'>{token} </span>
                    else if (token.toLowerCase().indexOf(pref.toLowerCase()) == 0)
                    {
                        let start = token.slice(0, pref.length)
                        let end = token.slice(pref.length, token.length )
                        return <><span className='text-xl font-bold text-gray-900'>{start}</span><span className='text-xl text-gray-400'>{end} </span></>
                    }
                    else
                    {
                        return <span className='text-xl text-gray-400'>{token} </span>
                    }
                })}
            </>
        )
    }
    return (
        <div className="w-full overflow-scroll">
            {
                list.map((elem, index) => (
                   <div key={index} className='font-black p-2 text-yellow-700'>
                       <p>
                           (<span className=" text-sm font-medium  text-red-400" >{matched_data[elem]["spac_id"]} </span>)
                           SPAC <span className=" text-xl text-gray-900" > {matched_data[elem]["matching_target"]} </span>
                            ( <MatchingElem text={matched_data[elem]["best_match"]}  matched_text={query}/> )
                            {/* <span className=" text-xl text-red-900" >({matched_data[elem]["best_match"]})</span> */}
                       </p>
                   </div> 
                ))
            }
        </div>
    )
}

const SearchOPtions = ({fieldsOptions, fields, onSubmit }) => {
    // for search input
    const [text_to_query, setText_to_query] = useState("")
    const [onLoad, setOnLoad] = useState(false)
    const [fetchedData, setFetchedData] = useState({autoCompleteOptions : [], ready : false})
    const [isOnFocuse, setIsOnFocuse] = useState(true)
    
    // for fields selection
    const [selectedFields, setSelectedFields] = useState([])


    useEffect(() => {
        console.log("search-Options starting use effect")
        if (!onLoad && selectedFields.length > 0 && selectedFields[0] != "")
        {
            console.log("search-Options starting fetch")
            setOnLoad(true)
            let query_url = search_url + "/" + selectedFields[0] + "?q=" + text_to_query
            let selected_fields = selectedFields
            let prod_query = search_url + "/getByFields"
            console.log(`search-Options input query : ${query_url}`, `prod query : ${prod_query}`)
            // let data = 
            fetch(prod_query, {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({query : text_to_query, fields : selected_fields})
            }).then(res => res.json()).then(query_res => {
                // console.log("recieved data -------------------------< ", query_res)
                // setAutoCompleteOptions(query_res.data.target_text)
                let ready = (query_res && Object.keys(query_res.err).length == 0 && Object.keys(query_res.matching).length > 0) ? true: false
                // console.log("search-Options fetched_data : ", query_res, "is_readyyyy : ", ready)
                setFetchedData({
                    autoCompleteOptions : query_res.matching,
                    matched_data : query_res.matched_data,
                    ready : ready
                })
                setOnLoad(false)
            })
        }
    },[text_to_query, fetchedData, isOnFocuse, selectedFields])
    
    
    const getSelectedFieldsTitle = (fields) => {
        let selected_fields = []
        fields.forEach(field => (
            selected_fields.push(field.title)
        ))
        setSelectedFields(selected_fields)
    }

    const trigger_selection = (e) => {
        if (!onLoad)
        {
            if (text_to_query != e.target.value)
            setText_to_query(e.target.value)
        }
    }
    
    const onAutoOptionClick = (e, text) => {
        console.log("heeeelllooooo ->>>>>>> ", (e.target.value != "") , "<<<<<<<<", !onload)
        if (e.target.value != "" && !onLoad)
        {
            // setText_to_query(e.target.value)
            e.target.value = text
            // let fake_e = {}
            // fake_e["target"] = {}
            // fake_e["target"]["value"] = text
            onSubmit(e)
        }
    }

    const onFocuse = () => {
        // console.log("onFocuse")
        setIsOnFocuse(true)
    }
    
    const notOnFocuse = () => {
        // console.log("Not onFocuse")
        setIsOnFocuse(false)
    }

    
    return (

    <div className="w-full flex flex-col">
        <div className='w-full flex flex-row h-80 justify-center items-center py-4'>
            <div className="flex flex-col justify-between flex-1 h-full  p-4 mx-4 rounded-md bg-gradient-to-t from-white via-white to-white " >
                <div className='flex w-full bg-white'>
                    <FieldsBox fieldsOptions={IndexOptions} getSelectedFields={getSelectedFieldsTitle} />
                </div>
                <div className='flex items-center w-full my-5 bg-slate-00'>
                <SearchInput
                    buttonText="search"
                    simple
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
            <div className="flex flex-col justify-center items-center flex-1 h-full  p-4 mx-4 rounded-md bg-gradient-to-t from-white via-white to-white" >
                {selectedFields.map((index, idx) => (
                        <p key={idx}>{getResSearchText(index, IndexOptions, fetchedData, "target")}</p>
                ))}
            
            </div>

        </div>
        <div className='w-full flex flex-row h-80 justify-center items-center py-4'>
            <div className="flex flex-col justify-between flex-1 h-full  p-4 mx-4 rounded-md bg-gradient-to-t from-white via-white to-white " >

            </div>
            <div className="flex flex-col justify-center items-center flex-1 h-full  p-4 mx-4 rounded-md bg-gradient-to-t from-white via-white to-white" >
            {fetchedData.ready && <ShowResult
                list={fetchedData.autoCompleteOptions}
                matched_data={fetchedData.matched_data}
                query={text_to_query}
            />}
            
            </div>

        </div>

    </div>
    )
}

function getResSearchText(index, IndexOptions, fetchedData, matching_target)
{

    let jsx_text_elem = <></>
    // console.log("auto complete **-->*", first_match)
    // console.log("first_match : ", first_match)
    
    if (fetchedData.ready)
    {
            let first_match = fetchedData.autoCompleteOptions[0]
            // console.log("---------------------first match : ", fetchedData.matched_data[first_match])
            IndexOptions.forEach(option => {
                if (option.title == index && "auto_complete_" + option.title == fetchedData.matched_data[first_match].index)
                {
                    jsx_text_elem =  option.interpret_res(fetchedData.matched_data[first_match].best_match, fetchedData.matched_data[first_match].matching_target)
                }
            });
            // console.log("im hereeeee",fetchedData.matched_data[first_match].best_match)

    }
    return jsx_text_elem
}


export default SearchOPtions;