import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  return <Redirect href="/screens/auth/login" />; // Redireciona para a tela de login ao abrir o app
}
