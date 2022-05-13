import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BoxSearch from '../components/BoxSearch'
import TableViewer from '../components/TableViewer'
import SqlTableViewer from '../components/SqlTableViewer'
import DisplaySearch from '../components/DisplaySearch'
import { useEffect, useState } from 'react'
import Title from '../components/Title'
import { search_query } from '../components/query_data'
import SearchOPtions from '../components/searchOptions'

const search_url = 'http://localhost:3001/api/spacs'


const SEARCH_QUERY = `{
  index: 'games',
  query: {
    match_all: {}
  }
}`







export default function Home({}) {
  const [searchHomeQuery, setHomeSearchQuery] = useState("")
  const [searchOptionQuery, setSearchOptionQuery] = useState("")
  const [fetchedData, setFetchedData] = useState({
    values_by_field_search : [""],
    documents_by_field_result : {}
  })
  const [isFocus, setIsFocus] = useState(true)

  
  const onHomeSearchClick = (e) => {
    // e.preventDefault()
    console.log("*************** HOME SEARCH QUERY : ", e)
    if  (e.target.value != "")
    {
      setHomeSearchQuery(e.target.value)
    }
  }

  const onSearchOptionsClick = (e) => {
    // e.preventDefault()
    console.log("************* SEARCH OPTION QUERY : ", e)
    if  (e.target.value != "")
    {
      setSearchOptionQuery(e.target.value)
    }
  }

  const changeDisplayType = (typeId) => {
    setDisplayTypeId(typeId)
  }

  useEffect(() => {
    console.log("search query -> ", searchHomeQuery)
    console.log("option search query -> ", searchOptionQuery)
  },[searchHomeQuery, searchOptionQuery])

  


  return (
    <div className={styles.container}>
      <Head>
        <title>Box Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-start items-center w-full bg-gray-00 overflow-scroll m-0 p-0">
        <BoxSearch focused={isFocus} field="name" onSubmit={onHomeSearchClick} displayTypeId tlwcss_height=" h-1/12 "/>
        {/* <SearchOPtions fieldsOptions={["name", "sponsors", "directors"]} onSubmit={onSearchOptionsClick} /> */}
        {/* <DisplaySearch focused={isFocus} searchQuery={searchQuery} queryResult={"data"} displayType={displayTypeId} changeDisplayTypeId/> */}
        {/* <TableViewer
          searchQuery={searchHomeQuery}
          table_name="Spacs"
        /> */}

      </main>

      <footer className="">
      </footer>
    </div>
  )
}
