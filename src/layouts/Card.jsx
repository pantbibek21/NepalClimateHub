import styles from '../styles/components/Card.module.css';
import { BiTargetLock } from "react-icons/bi";

const Card = ({ data, dataType, cardProfilePictureBgSize }) => {

  let url = dataType == "organization"? `/organizations/${data.slug}` : `/climate-champions/${data.slug}`;

  return (
    <a className={styles["organization-card"]} href={url}>
      <div className={styles["logo-wrapper"]}>
        <img
          src={data.logoUrl}
          alt={data.name}
          style={{ objectFit: cardProfilePictureBgSize }}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles["organization-name"]}>{data.name}</h3>
        <p className={styles.location}>
          <span className={styles.icon}>
         <BiTargetLock />
          </span>
          <span className={styles.address}>{data.address}</span>
        </p>
        <p className={styles.description}>
          {data.description.substring(0,112) + "..."}
        </p>
        <div className={styles.tags}>
          {data.tags.slice(0,3).map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Card;
