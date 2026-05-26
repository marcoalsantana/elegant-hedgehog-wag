"use client";

import { useEffect } from "react";

const TAB_REMINDERS = { 
  originalTitle: 'Agência Obra | Arquitetura', 
  textOne: '✦ Não vá embora...', 
  textTwo: '✦ Veja nossos projetos' 
};

export default function TabReminders() {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let isTextOne = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = TAB_REMINDERS.textOne;
        interval = setInterval(() => {
          isTextOne = !isTextOne;
          document.title = isTextOne ? TAB_REMINDERS.textOne : TAB_REMINDERS.textTwo;
        }, 2000);
      } else {
        clearInterval(interval);
        document.title = TAB_REMINDERS.originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return null;
}
