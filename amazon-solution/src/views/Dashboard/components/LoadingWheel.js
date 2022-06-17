import React from 'react';
import ReactLoading from 'react-loading'

function LoadingWheel({ witdh, height, className }) {
    return (
        <ReactLoading
            type={"spin"}
            color={"#ffffff"}
            height={height}
            width={witdh}
            className={className}
        />
    )
}

export default LoadingWheel;