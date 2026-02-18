import { allBlockQueries } from "../blocks";
import { Snippets } from "../snippets";

const GET_PAGE = `
  query($slug:String, $locale:SiteLocale) {
      page(locale:$locale filter:{ slug: { eq: $slug }}) {
          id
          slug
          title
          _status
          parent {
          id
          slug
          }
          blocks {
            __typename
            ${allBlockQueries}
          }
          _firstPublishedAt
      }

  }
`;

const GET_SLUGS = `
  query($excludeSlug:String) {
      allPages(filter:{ slug: { neq: $excludeSlug }}) {
          slug
          _locales
      }

  }
`;

const GET_NAVIGATION = `
  query($excludeSlug:String, $locale:SiteLocale) {
      allPages(locale:$locale filter:{ slug: { neq: $excludeSlug }}) {
          ${Snippets.navProps}
          ${Snippets.children}
          ${Snippets.parent}
      }

  }
`;

export const Queries = {
  getPage: GET_PAGE,
  getSlugs: GET_SLUGS,
  getNavigation: GET_NAVIGATION,
};
