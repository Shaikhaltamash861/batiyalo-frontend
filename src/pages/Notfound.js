import React from 'react'

function Notfound() {
  return (
    < div style={{
        color:'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight:600,
        fontSize:'100px'
                                  }}>
    <h2 >404</h2>
    <div >Page Not Found!!</div>
    </div>
  )
}

export default Notfound