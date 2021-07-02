import React from 'react'

function Buttons(props) {
    return (
        <div>
            {(props.isRunning===0) ? 
                <button onClick={props.start} id='start' type='button'>Start</button> : ''
            }
            {(props.isRunning===1) ? 
                <button onClick={props.stop} id='stop' type='button'>Stop</button> : ''
            }

            <button onClick={props.reset} id='reset' type='button'>Reset</button>

            <button onClick={props.wait} id='wait' type='button'>Wait</button>
        </div>
    )
}

export default Buttons