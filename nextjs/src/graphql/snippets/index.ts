const metadata = `
  metadata {
    title
    description
    shareImage {
      url
    }
  }
`;

const navProps = `
    title
    slug
    position
`;

const parent = `
  parent {
    ${navProps}
    parent {
      ${navProps}
      parent {
        ${navProps}
      }
    }
  }
`;

const children = `
  children {
    ${navProps}
    children {
      ${navProps}
      children {
        ${navProps}
      }
    }
  }
`;

const media = `
  media {
    media {
      ...on ImageBlockRecord {
        id
        asset {
          alt
          url
        }
      }
    }
  }
`;

export const Snippets = {
  metadata,
  media,
  parent,
  children,
  navProps,
};
