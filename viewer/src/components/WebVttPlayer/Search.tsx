import React, { FunctionComponent } from "react"  // TODO: fix warning
import styles from "./Search.module.css"

const Search: FunctionComponent<SearchProps> = ({ query, updateQuery }) => {
  return (
    <div className={styles.search}>
      <div className={styles.container}>
        <span className={styles.icon}>🔍</span>
        <input 
          value={query}
          onChange={e => updateQuery(e.target.value)} />
      </div>
    </div>
  )
}

// set prop types using TypeScript
type SearchProps = {
  query: string,
  updateQuery: (query: string) => void
}


export default Search