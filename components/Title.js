
const Title = ({ title, blueAtFirst, customizedStyle}) => {

    let styledWord = ""

    if (!blueAtFirst)
        styledWord = <span>{title}</span>
    else
        styledWord = title.split(' ').map((word, idx) => <span key={idx} className={(idx > 0) ? "text-black" : "text-blue-500"}> {word}</span>)
    
    return (
        <h1 className={`${customizedStyle || " text-xl "}`}>
            {styledWord}
        </h1>
    )
}

export default Title