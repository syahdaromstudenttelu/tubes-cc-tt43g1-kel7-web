import Head from 'next/head';
import {
  PrimaryButtonLink,
  SecondaryButtonLink,
} from '../components/button-links';
import { ralewayFont, interFont } from '../lib/myNextFonts';

export default function Home() {
  return (
    <main className={`${ralewayFont.variable} ${interFont.variable}`}>
      <Head>
        <title>GOVEL | Yukk bepergian dengan Go Travel!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="h-screen w-full">
        <div className="grid h-full grid-cols-2">
          <div className="relative h-full">
            <div
              className="h-full bg-hero-bg bg-cover bg-right"
              aria-hidden="true"
              role="presentation"
            />

            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent" />

            <p className="absolute bottom-4 left-3 text-xs text-slate-400">
              Gambar milik{' '}
              <a
                href="https://unsplash.com/@tristanhess?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                className="underline"
              >
                Tristan Hess
              </a>{' '}
              dari{' '}
              <a
                href="https://unsplash.com/s/photos/mini-bus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                className="underline"
              >
                Unsplash
              </a>
            </p>
          </div>

          <section className="h-full">
            <div className="grid h-full items-center">
              <div className="text-center">
                <div className="mb-12">
                  <h1 className="mb-1 cursor-default select-none font-raleway text-6xl font-bold text-slate-700">
                    GOVEL
                  </h1>

                  <p className="text-lg font-semibold">
                    Yukk bepergian dengan Go Travel!
                  </p>
                </div>

                <div className="mx-auto grid max-w-lg gap-y-4">
                  <PrimaryButtonLink hrefPath="/">Masuk</PrimaryButtonLink>

                  <SecondaryButtonLink hrefPath="/">
                    Registrasi
                  </SecondaryButtonLink>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
