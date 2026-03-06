export type DatoBaseType = {};

export type DatoPageType = DatoBaseType & {
  slug: string;
  title: string;
  blocks: [];
};

export type DefaultBlockProps<T> = {
  __typename: string;
} & T;

export type DatoPageResponseType = {
  page: DatoPageType;
};

export type DatoSlugsResponseType = {
  allPages: { slug: string; _locales: string[] }[];
};

export type DatoSettingssResponseType = {
  settingsModel: DatoSettingsProps;
};

export type DatoNavigationProps = {
  slug: string;
  title: string;
  position: string;
  children?: DatoNavigationProps[];
  parent?: DatoNavigationProps;
};

export type DatoLinkProps = {
  title: string;
  slug: string;
  id: string;
  parent?: DatoNavigationProps;
};

export type DatoSettingsProps = {
  address?: string;
  tele?: string;
  email?: string;
};

export type DatoNavigationResponseType = {
  allPages: DatoNavigationProps[];
};
