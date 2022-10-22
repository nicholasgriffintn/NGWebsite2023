const ReturnImageFormattingUrl = (url) => {
  const baseUrl = {
    development: 'https://images.nicholasgriffin.dev',
    production: 'https://images.nicholasgriffin.dev',
  }[process.env.NODE_ENV];

  if (url.startsWith('https://cdn.nicholasgriffin.dev/')) {
    const noCDNURL = url.replace('https://cdn.nicholasgriffin.dev/', '');

    return `${baseUrl}/resize/?image=${noCDNURL}`;
  }

  return url;
};

export default ReturnImageFormattingUrl;
