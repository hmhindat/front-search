import { useEffect, useState } from "react"
const search_url = 'http://localhost:3001/api/spacs'


const FieldTitle = ({ title , hoverColor, color, onFieldClick}) => {

    return (
        <div
            className={`flex h-full rounded-sm mx-1 hover:"bg-blue-200" ${color} cursor-default`}
            onClick={(e) => onFieldClick(title)}    
        >
            <label className="p-2">{title}</label>
        </div>
    )
}

const FieldsViewer = ({ fields_list, selected_field, selectField }) => {

    useEffect(() => {

    },[selected_field])

    return (
        <div className="flex w-full h-auto rounded-md border-b-2 overflow-y-scroll bg-white">
            {fields_list.map((title, idx) => (
                <FieldTitle
                    key={idx}
                    title={title}
                    hoverColor="bg-blue-200"
                    color={ (title == selected_field) ? "bg-blue-400" : "bg-blue-100"}
                    onFieldClick={selectField}
                />
            ))}
        </div>
    )
}

const ColumnValues = ({ values_list, onValueClick, selected_value }) => {

    useEffect(() => {

    },[selected_value])
    // const clickHandler = (value, idx) => {
    //     onValueClick
    // }
    return (
        <div className="flex flex-col justify-start items-start w-full h-full overfl">
            {values_list && values_list.map((value, idx) => (
                <div key={idx} className={`z-50 relative w-full   my-1  ${(selected_value == idx && " bg-gradient-to-r from-slate-600 to-slate-100 text-gray-200") || " bg-slate-100 text-gray-900" }  hover:bg-slate-300 `} onMouseDown={() => onValueClick(value, idx)}>
                    {value && value || "null" }
                    <div className="absolute left-full top-1/2 h-1 bg-gray-200 w-12"></div>
                    <div className="z-10 absolute right-full -top-1/3 w-20 h-8">
                        <div className={`relative flex justify-center items-center w-2/3 h-2/3 rounded-md ${(selected_value == idx && "bg-gradient-to-r from-gray-900 to-slate-600 text-gray-200") || " bg-slate-600 text-gray-200" } border border-green-900`}>
                            <span className="" >{idx}</span>
                            {selected_value == idx  && <hr className={`absolute -right-1/2 top-2/3 w-1/2 border-2 border-slate-600 `} />}

                        </div>
                    </div>
                </div>
                
            ))}
        </div>
    )
}

// displays all object's fields fields 
const FieldsView = ({ title, hitSource, tlwind_customized, between, centerText }) => {
    useEffect(() => {

    }, [hitSource])
    console.log("FieldView LIST Object : ", hitSource)
    const list = { 'hi': "sdfas", 'score': 99 }
    return (
        <div className={tlwind_customized || ` w-1/4 m-8 h-50 flex flex-col-reverse justify-end items-center overflow-scroll max-h-100 bg-white border-2 border-gray-700 rounded-md`}>
            {/* <div className='flex flex-row justify-center w-full'>{title}</div> */}
            {Object.keys(hitSource).map((field, f_idx) => (
                <div key={f_idx} className={`flex w-full flex-row ${between && " justify-between " }  items-start border-b-2 border-gray-900`}>
                    <lable className="flex justify-start items-start text-start w-11/12">{field} : </lable>
                    <lable className="flex justify-start items-start text-start w-11/12">{hitSource[field]}</lable>
                </div>
            ))}
        </div>
    )
}

const DocunentViewer = ({ document }) => {
    console.log("selected document : ", document)
    return (
        <div className="relative flex flex-1 flex-col justify-center items-center rounded-lg h-full  bg-gray-200">
            <div className="absolute flex justify-center top-0 left-0 w-full h-20 my-2">

                <div className="flex h-full w-2/5 justify-center items-center bg-white text-4xl font-black rounded-lg shadow-softdark">Document</div>
            </div>
            <div className="w-full h-28"/>
            <div className="h-auto w-10/12 m-10 overflow-y-scroll p-2 bg-slate-100 shadow-softdark border- border-gray-600 rounded-sm">
                <FieldsView
                title
                hitSource={document}
                tlwind_customized
                between
                centerText/>
            </div>
        </div>
    )
}

const DocumentsFieldView = ({fieldOnFocuse, field_values, selectValue, selected_value}) => {

    return (
        <div className="flex flex-1 flex-col justify-start items-center h-full px-2 bg-blu-600">
            <div className="flex flex-row justify-start items-start w-full h-1/6 py-5 ">
                <h2 className="text-2xl font-thin"><span className="font-bold text-3xl">Matching Documents</span> / Docs({fieldOnFocuse})</h2>
            </div>
            <div className="flex justify-center items-center w-full h-5/6 overflow-hiddn px-8 bg-gren-300">
                <ColumnValues values_list={field_values} onValueClick={selectValue} selected_value={selected_value}/>
            </div>
            
        </div>
    )
}

const DocumentsView = ({ values_documents_list, values_list, fieldOnFocuse}) => {
    const [onFocuseFieldValues, setOnFocuseFieldValues] = useState([""])
    const [selectedFieldValue, setSelectedFieldValue] = useState(0)
    const [selectedDocument, setSelectedDocument] = useState({})
    
    // const getFieldValues = (values_documents_list, fieldOnFocuse) => {
        
    //     if (value_document_list && Object.keys(value_document_list) != 0 && value_document_list.hasOwnProperty(fieldOnFocuse))
    // }

    const changeToFieldValues = () => {
        let new_field_values = []
        
        values_list.forEach(value => {
            if (values_documents_list && Object.keys(values_documents_list) != 0 && values_documents_list.hasOwnProperty(value))
            {
                new_field_values.push(values_documents_list[value][fieldOnFocuse])
            }
        });
        setOnFocuseFieldValues(new_field_values)
    }

    useEffect(() => {
        console.log("result has been changed")
        changeToFieldValues()

    },[fieldOnFocuse])

    const onValueClick = (fieldValue, idx) => {
        console.log(`${fieldValue} is selected`)
        setSelectedFieldValue(idx)
        console.log("index selected -> ", idx, values_list[idx])
        console.log("index selected -> ", values_documents_list)        
        console.log("index selected -> ", values_documents_list[values_list[idx]])
        setSelectedDocument(values_documents_list[values_list[idx]])
    }

    return (
        <div className="flex flex-row justify-center items-start w-full h-screen border-gray-100 border-t-2 p-4 bg-white">
            <DocumentsFieldView fieldOnFocuse={fieldOnFocuse} field_values={onFocuseFieldValues} selectValue={onValueClick} selected_value={selectedFieldValue}/>
            <DocunentViewer document={selectedDocument} />
        </div>
    )
}

const TableViewer = ({ table_name, searchQuery}) => {
    const [data, setData] = useState({
        query : "",
        all_fields : [],
        values_by_field_search : [],
        documents_by_field_result : {},
        isReady : false
    })

    const [onload, setOnLoad] = useState(false)
    const [selectedField, setSelectedField] = useState("")
    // const [s]

    const fake_documents = [{
        "name" : ["aaa", "sss", "dddd", "fff"], // result search by name
        "numbers" : ["1111", "2222", "333", "444"], // result search by numbers
        "symbols" : ["@@@@", "####", "$$$$", "!!!"] // result search by name
    }]

    // SEARCH BY FIELD DATA

    // document_fields
    const fake_fields_list = ["name", "unit_ticker", "cik", "sponsor", "unit_performance", "warrants_over_units", "address", "type", "common_stock_ticker"]

    const fake_values_by_field_search = ["name1", "name2", "name4"]
    // ex : search in field -> name
    // [ {name1 : document where field name == name1} ]
    const fake_documents_by_field_result = {
        "name1" : {"name" : "name1", "sponsor" : 0.783, "unit_ticker" : "this is the document with score 0.783 ", "cik" : null},
        "name2" : {"name" : "name2", "sponsor" : 0.43, "unit_ticker" : "this is the document with score 0.43 ", "cik" : "not null"},
        "name3" : {"name" : "name3", "sponsor" : 0.12, "unit_ticker" : "this is the document with score 0.12 ", "cik" : 123},
        "name4" : {"name" : "name4", "sponsor" : 0.001, "unit_ticker" : "this is the document with score 0.001 ", "cik" : "2021-09-29T23:00:00.000Z"}
    }
    const get_fields = (fakefield_search_data) => {
        field_values = []
        
        fakefield_search_data.forEach(res_document => {
            field_values.push(res_document)
        });
    }
    
    useEffect(() => {
        if (!onload  && data.query != searchQuery)
        {
            console.log("starting use effect")
            setOnLoad(true)
            let query_url = search_url + "/name"+ "?q=" + searchQuery
            console.log(`display input query : ${query_url}`)
            fetch(query_url,{
                method : 'GET',
                headers : { 'Content-Type': 'application/json' }
            }).then(res => res.json()).then(query_res => {
                console.log("***********table Viewerrrrr fetched data : ", query_res)
                setData({
                    query : query_res.query,
                    all_fields : query_res.all_fields,
                    values_by_field_search : query_res.all_values_per_field,
                    documents_by_field_result : query_res.document_for_each_field_value,
                    isReady : true
            })
            // console.log(data.hits)
            setOnLoad(false)
            })
        }
    },[searchQuery])
    
    
    const selectField = (field_title) => {
        console.log("hi there")
        setSelectedField(field_title)
    }

    return (
        <div className="w-11/12 flex flex-col justify-start items-center p-4 ">
        {!onload && <div className="flex justify-center items-center w-full h-20 text-4xl bg-white">{table_name}</div>}
        {!onload && <FieldsViewer
                    fields_list={fake_fields_list}
                    selected_field={selectedField}
                    selectField={selectField}
                />}
                {!onload &&  <DocumentsView values_documents_list={data.documents_by_field_result } values_list={data.values_by_field_search}    fieldOnFocuse={selectedField} />}
        </div>
    )
}

export default TableViewer