import { defaultLang, languages, showDefaultLang, ui } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    if (key in ui[lang]) {
      // @ts-ignore
      return ui[lang][key];
    } else if (key in ui[defaultLang]) {
      return ui[defaultLang][key];
    } else {
      // Handle the case where the key doesn't exist in either object
      return '';
    }
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}

export function getEntryStaticPaths(entries: any[]): any[] {
  return entries.map((entry) => {
    let lang = defaultLang;
    let slug = [entry.slug];
    if (entry.slug.includes('/')) {
      // Is in a language subdirectory
      const [entryLang, ...entrySlug] = entry.slug.split('/');
      if (
        Object.keys(languages).includes(entryLang) &&
        entryLang !== defaultLang
      ) {
        lang = entryLang;
        slug = entrySlug;
      }
    }
    return {
      params: { lang, slug: slug.join('/') || undefined },
      props: { entry },
    };
  });
}

export function entryMatchesLang(entry: any, lang: string) {
  // If not a default language, then it will be in a language subdirectory.
  if (lang !== defaultLang) {
    return entry.slug.startsWith(`${lang}/`);
  }

  // If it is the default language, then it will not be in a language subdirectory.
  return !Object.keys(languages).some((lang) =>
    entry.slug.startsWith(`${lang}/`)
  );
}

export function getEntryLangFilter(lang: string) {
  return (entry: any) => entryMatchesLang(entry, lang);
}

export function filterEntriesByLang(entries: any[], lang: string) {
  return entries.filter((entry) => entryMatchesLang(entry, lang));
}

export { defaultLang };
