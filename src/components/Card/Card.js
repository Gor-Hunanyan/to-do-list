import React from "react";
import styles from "./Card.module.css";

function Card({ data, onClick }) {
  return (
    <div className={styles.card} onClick={onClick} title={data.description}>
      {data.name}
    </div>
  );
}

export default Card;
