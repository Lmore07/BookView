"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  //Variables declaradas
  const router = useRouter();
  router.replace("/login");

  return (
    <main></main>
  );
}
