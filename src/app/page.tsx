import { BenefitCard } from "@/components/BenefitCard";
import { Machine } from "@/components/Machine";
import { Play } from "lucide-react";

import styles from "../styles/page.module.scss";

export default function Home() {
  const images = Array.from({ length: 64 }, (_, i) => `/prime-x/${i + 1}.png`);

  return (
    <main>
      <section className={styles.main}>
        <div className={styles.content}>
          <Machine images={images} />
          <div>
            <span>Para você por inteiro</span>
            <h1>Alma PrimeX</h1>
            <p>
              O Alma PrimeX combina tecnologias inovadoras de radiofrequência e
              ultrassom em um único dispositivo. Essas tecnologias são de última
              geração e amplamente confiadas por profissionais em todo o mundo.
              Com resultados notáveis, esta plataforma permite aos profissionais
              oferecer uma ampla gama de tratamentos para o corpo e o rosto.
            </p>

            <div className={styles.video_link}>
              <Play color="var(--primary)" />
              <p>Como isso funciona?</p>
            </div>
          </div>
        </div>

        <div className={styles.benefits}>
          <h2>Por que escolher o Alma PrimeX?</h2>

          <div className={styles.benefit_content}>
            <BenefitCard />
            <BenefitCard />
          </div>
        </div>
      </section>
    </main>
  );
}
