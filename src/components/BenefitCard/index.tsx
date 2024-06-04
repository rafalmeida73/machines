import React from "react";

import { Star } from "lucide-react";

import styles from "./benefit.module.scss";

export const BenefitCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>
        <Star color="var(--primary)" />
      </div>
      <h3>Lorem Ipsum</h3>
      <p>
        As ondas guiadas de ultrassom patenteadas da Alma afetam seletivamente o
        tecido adiposo, resultando em uma redução do volume desse tecido
        evidenciada em resultados clínicos notáveis.
      </p>
    </div>
  );
};
