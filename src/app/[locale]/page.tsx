"use client"
import FormQuery from "@/components/FormQuery";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Meta from "@/components/global/Meta";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Home({params}:{params:{locale:string}}) {
  const t = useTranslations("Index")

  return (
    // <Suspense i18nIsDynamicList fallback={"Loading,,,,"}>
    //   {t('test')}
    // </Suspense>
    <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradienthero'>
      <Meta />
      <Header />
      <FormQuery />
      <Footer />
    </div>
  );
}
