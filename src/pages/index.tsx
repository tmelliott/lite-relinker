import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const BASE_LINK = "https://lite.docker.stat.auckland.ac.nz";
const BACKUP_DOMAIN = "https://lite-back.up.railway.app";

const Home: NextPage = () => {
  const [msg, setMsg] = useState("");
  const [link, setLink] = useState(BACKUP_DOMAIN);

  const updateLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // if value doesn't start with BASE_LINK, don't update
    setMsg("");
    if (!value || value === "") {
      setLink(BACKUP_DOMAIN);
      return;
    }
    if (!value.startsWith(BASE_LINK)) {
      setLink("");
      setMsg("Please enter a valid iNZight Lite link.");
      return;
    }

    // replace BASE_LINK with BACKUP_DOMAIN
    const newLink = value.replace(BASE_LINK, BACKUP_DOMAIN);
    setLink(newLink);
  };

  return (
    <>
      <Head>
        <title>iNZight Lite Link Switcher</title>
        <meta
          name="description"
          content="Quickly substitute iNZight Lite links with a different domain."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-xl">
            Paste an iNZight Lite link below to switch the domain.
          </h1>
          <form className="flex w-full flex-col items-center justify-center gap-4">
            <input
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              type="text"
              onChange={updateLink}
              placeholder={BASE_LINK}
            />

            <div className="flex w-full flex-col text-center">
              <strong>Updated link:</strong>
              <a
                href={link}
                className="text-blue-600 hover:text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
              <p className="text-red-500">{msg}</p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
