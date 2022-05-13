import { useEffect } from 'react'
import Title from './Title'

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

const IndexView = ({ focused, isOnLoad, dataIsReady, searchInfo, listOfHits, tlwcss_width, tlwcss_height }) => {
    console.log("IndexView LIST Object : ", listOfHits)
    useEffect(() => {

    }, [focused])

    if (focused)
        return (
            <div className={`flex flex-col justify-start items-center p-1 m-2 rounded-sm border-2 border-gray-900 ${tlwcss_width || " w-100 "} ${tlwcss_height || " h-auto "}`}>
                {/* {!isOnLoad && <div className="flex items-center justify-center text-4xl w-full h-full">...Is Loading</div>} */}
                {dataIsReady && focused && <FieldsView
                        tlwind_customized=" flex flex-raw items-center justify-center text-2xl w-1/2 h-40 shadow-softdark p-2 "
                        title="search info"
                        hitSource={searchInfo}
                        between
                        centerText
                        />}
                {dataIsReady && focused  && <div className="flex flex-wrap justify-center w-11/12 h-auto m-4 overflow-y-scl scrol bg-ora">
                    {listOfHits.map((hit, el_idx) => <FieldsView key={el_idx} title="document" hitSource={hit._source} between />)}
                </div>}
            </div>
        )
    else
        return <div></div>
}

export default IndexView