import React from 'react'

function ErrorMessage({children}) {
    return (
        <p className='bg-red-600 p-2 text-center text-white uppercase text-sm font-bold'>
            {children}
        </p>
    )
}

export default ErrorMessage
