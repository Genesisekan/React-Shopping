
function History({history, onClick}){
    const HistoryItems = history.map((value, index) => {
        return <li key={index} className="history-item" onClick={() => {onClick(index)} } >Step {index+1}</li>
    })

    return (
    <div>
        <h2 className="history-title">History</h2>
        <ul className="history-list">
            {HistoryItems}
        </ul>
    </div>);
}
export default History;