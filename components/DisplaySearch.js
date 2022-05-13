import { useState, useEffect } from "react"
import Title from './Title'
import IndexView from "./IndexView"

const search_url = 'http://localhost:3001/search'

const DisplaySearch = ({focused, searchQuery, queryResult, displayType, changeDisplayType, tlwcss_width, tlwcss_height }) => {

    const [data, setData] = useState({isReady : false, hits : [], searchInfo : {}})
    const [onload, setOnLoad] = useState(false)

    const tlwcss_style = {
        height  : "h-full",
        width   : "w-full"
    }

    useEffect(() => {
        if (focused && searchQuery != "" && !onload)
        {
            setOnLoad(true)
            let query_url = search_url + "/all" + "?q=" + searchQuery
            console.log(`display input query : ${query_url}`)
            fetch(query_url,{
                method : 'GET',
                headers : { 'Content-Type': 'application/json' }
            }).then(res => res.json()).then(query_res => {
                // console.log("***********display fetched data : ", query_res)
                setData({
                     searchInfo : query_res.searchInfo,
                     hits : query_res.hits.reverse(),
                     isReady : true
                })
                // console.log(data.hits)
                setOnLoad(false)
            })
        }
    }, [searchQuery, focused])

    const DisplayView = () => {
        if (displayType == 0) {
            return (
                <IndexView
                    title="search in all fields"
                    focused={true}
                    isOnLoad={onload}
                    dataIsReady={data.isReady}
                    searchInfo={data.searchInfo}
                    listOfHits={data.hits}
                    tlwcss_width={tlwcss_style.width}
                    tlwcss_height={tlwcss_style.height} />
            )
        }
        else if (displayType == 1)
        {
            return (
                <IndexView
                    title="search in all fields"
                    focused={true}
                    isOnLoad={onload}
                    dataIsReady={data.isReady}
                    searchInfo={data.searchInfo}
                    listOfHits={data.hits}
                    tlwcss_width={tlwcss_style.width}
                    tlwcss_height={tlwcss_style.height} />
            )

        }
    }

    return (
        <div className="w-full h-9/12  bg-orange-00 overflow-y-scrol">
            <div className="text-4xl flex flex-col justify-center items-center">{searchQuery}</div>
            <DisplayView />
            {/* <DisplayFieldsView /> */}
        </div>
    )
}

export default DisplaySearch