import UtkastList from "@components/UtkastList/UtkastList";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { Alert, Loader } from "@navikt/ds-react";
import { useLanguage } from "@src/hooks/useLanguage";
import { baseUrl, utkastApiUrl } from "src/urls.client";
import { fetcher } from "src/utils/api.client";
import useSWR from "swr";
import styles from "./Utkast.module.css";

export interface UtkastProps {
  loading: boolean;
  utkast: UtkastElement[] | undefined;
  isPartialContent: boolean;
}

export interface UtkastElement {
  tittel: string;
  link: string;
  utkastId: string;
  opprettet: string;
  sistEndret: string;
  metrics?: MetricValues | null;
}

export interface MetricValues {
  skjemakode: string;
  skjemanavn: string;
}

interface Props {
  language: Language
}

const Utkast = ({ language }: Props) => {

  const { data: utkastApiData, error, isLoading } = useSWR({url: utkastApiUrl}, fetcher);

  useLanguage(language);

  const utkastlist = utkastApiData?.data;
  const isPartialContent = utkastApiData?.statusCode == 207;

  if (error) {
    window.window.location.href = `${baseUrl}/error`
  }

  return (
    <>
      <div className={styles.utkast}>
        {!isLoading && isPartialContent ? <Alert variant={"warning"}>{text.partialContent[language]}</Alert> : null}
      </div>
      {isLoading ? (
        <div className={styles.loadingDiv}>
          <Loader id="loader" size="3xlarge" title="venter..." />
        </div>
      ) : (
        <UtkastList utkast={utkastlist} language={language}/>
      )}
    </>
  );
};

export default Utkast;
