import React from 'react'

export default function Categories() {
    return (
        <div>
            <h1>i am category page</h1>
        </div>
    )
}

export async function getServerSideProps({category}) {
    console.log("props"+category);
    return {
      props: {}, // will be passed to the page component as props
    }
  }