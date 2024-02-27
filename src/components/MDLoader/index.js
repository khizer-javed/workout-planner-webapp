import React from 'react'

const Loading = (props) => {
  const { loading, children } = props

  if (loading) {
    return <>
      <div style={{
        height: "100vh",
        width: '100%',
        position: "absolute",
        inset: "0",
        background: 'white',
        opacity: 0.5
      }} />
    </>
  }

  return children
}

export default Loading