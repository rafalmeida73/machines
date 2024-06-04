"use client";

import React from "react";

import Image from "next/image";
import { ReactImageTurntable } from "react-image-turntable";

import styles from "./machine.module.scss";
import { MachineProps } from "./types";

export const Machine: React.FC<MachineProps> = ({ images }) => {
  return (
    <div className={styles.container}>
      <ReactImageTurntable
        images={images}
        autoRotate={{
          disabled: true,
        }}
        initialImageIndex={5}
      />
      <div className={styles.image360}>
        <Image
          src="/imgs/360.png"
          width={77.36}
          height={50}
          alt="É possível girar a imagem em 360 graus"
        />
      </div>
    </div>
  );
};
