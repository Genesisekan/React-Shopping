function Square({value, index, onClick}) {
    return(
    <>
        <div className='board-square' onClick={() => onClick(index)}>{value}</div>
    </>
    )
}

export default Square;