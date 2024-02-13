// app/providers.tsx
// "use client";
"use client"

import {NextUIProvider} from '@nextui-org/react'
import { NextIntlClientProvider, useMessages } from 'next-intl';
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  // const messages = useMessages()
  // console.log("Messages:", messages)
  return (
    // <NextIntlClientProvider locale='en'>
      <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
      </NextUIProvider>
    // </NextIntlClientProvider>
  )
}