"use client"

import styles from "./loader.module.css"

export default function LoaderSection () {
    return  (
        <>
            <div className={styles.cont}>
                <span className={styles.loader}></span>
            </div>
        </>
    )
}