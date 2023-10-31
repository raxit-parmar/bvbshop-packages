import React from 'react';

export class ClientGA {
  static async track(notTrackURLs = []) {
    const gaCode = process.env.GA_TRACKING_ID;
    const gtmCode = process.env.GTM_CONTAINER_ID;
    if (gaCode && typeof window.gtag === 'function') {
      window.gtag('config', gaCode, {
        // eslint-disable-next-line
        page_path: window.location.pathname,
      });
    }
    if (gtmCode) {
      window.dataLayer = window.dataLayer || [];
      if (!notTrackURLs.includes(window.location.pathname)) {
        window.dataLayer.push({
          event: 'Pageview',
          pagePath: window.location.pathname,
          pageTitle: window.document.title,
        });
      }
    }
  }
}

export class ServerGA {
  static async initialize(Application) {
    const gaCode = process.env.GA_TRACKING_ID;
    const gtmCode = process.env.GTM_CONTAINER_ID;
    if (gaCode || gtmCode) {
      // Application.htmlProps.head.push(<link key="gtm_ga_preConnect" rel="preconnect" href="https://www.googletagmanager.com/" crossOrigin="anonymous" />);
    }
    if (gaCode) {
      Application.htmlProps.footer.push(
        <script defer key="google_analytics_link" src={`https://www.googletagmanager.com/gtag/js?id=${gaCode}`} />,
      );
      Application.htmlProps.footer.push(
        <script
          defer
          key="google_analytics_script"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaCode}', { anonymize_ip: true });`,
          }}
        />,
      );
    }
    if (gtmCode) {
      Application.htmlProps.footer.push(
        <script
          defer
          key="google_tag_manager_script"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
              {'gtm.start': new Date().getTime(),event:'gtm.js'}
              );var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmCode}');`,
          }}
        />,
      );
      Application.htmlProps.footer.push(
        <noscript key="google_tag_manager_noscript">
          <iframe
            sandbox=""
            src={`https://www.googletagmanager.com/ns.html?id=${gtmCode}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>,
      );
    }
  }
}
