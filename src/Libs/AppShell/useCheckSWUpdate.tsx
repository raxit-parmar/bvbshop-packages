const useCheckSWUpdate = (props: { onUpdateAvailable?: () => void } = {}) => {
  return () => {
    const { onUpdateAvailable } = props;
    // Service Worker Update code
    // REF: https://deanhume.com/displaying-a-new-version-available-progressive-web-app/

    // Refresh Code : newWorker.postMessage({ action: 'skipWaiting' });
    if ('serviceWorker' in navigator) {
      let newWorker;
      // console.log('navigator.serviceWorker'), navigator.serviceWorker;
      navigator.serviceWorker.ready.then((reg) => {
        // console.log('reg', reg);
        reg.addEventListener('updatefound', () => {
          // console.log('updatefound');
          // An updated service worker has appeared in reg.installing!
          newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            // console.log('statechange');

            // Has service worker state changed?
            switch (newWorker.state) {
              case 'installed':
                // console.log('newWorker.state', newWorker.state);
                // console.log('navigator.serviceWorker.controller', navigator.serviceWorker.controller);

                // There is a new service worker available, show the notification
                if (navigator.serviceWorker.controller) {
                  console.log('Update Available');
                  // newWorker.postMessage({ action: 'skipWaiting' });

                  newWorker.postMessage({ action: 'install' });
                  if (typeof onUpdateAvailable === 'function') {
                    onUpdateAvailable();
                  } else {
                    window.location.reload();
                  }

                  /**
                    toast.dismiss();
                    toast.info(
                      () => (
                        <>
                          {trans('updateTitle')}&nbsp;
                          <b
                            onClick={() => {
                              newWorker.postMessage({ action: 'install' });
                              window.location.reload();
                            }}
                          >
                            {trans('updateBtnTitle')}
                          </b>
                        </>
                      ),
                      config.DEFAULT_TOAST_SETTINGS,
                    );
                     */
                }
                break;
            }
          });
        });
      });
    }
  };
};

export default useCheckSWUpdate;
