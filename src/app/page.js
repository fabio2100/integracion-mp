"use client";
import styles from "./page.module.css";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState, useEffect } from "react";
initMercadoPago(`${process.env.NEXT_PUBLIC_MP_PUBLIC_KEY}`);

export default function Home() {
  const [preference, setPreference] = useState(null);

  useEffect(() => {
    // Llama a la API para obtener el preference_id const
    const fetchPreference = async () => {
      try {
        const res = await fetch("/api/getPreferences");
        const data = await res.json();
        setPreference(data.preferences);
      } catch (error) {
        console.error("Error fetching preference ID:", error);
      }
    };
    fetchPreference();
  }, []);

  return (
    <div className={styles.page}>
      <p className={styles.description}>
        Este es un ejemplo de una aplicación Next.js con Mercado Pago.
      </p>
      {console.log(preference)}
      {preference ? (
        <Wallet
          initialization={{ preferenceId: preference.id }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
