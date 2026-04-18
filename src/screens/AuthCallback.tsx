import React, { useEffect } from 'react';

export default function AuthCallback() {
  useEffect(() => {
    // Extract token from hash or query params
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
    const error = params.get('error');

    if (accessToken) {
      window.opener.postMessage({
        type: 'OAUTH_SUCCESS',
        accessToken,
        expiresIn: parseInt(expiresIn || '3600')
      }, window.location.origin);
      window.close();
    } else if (error) {
      window.opener.postMessage({
        type: 'OAUTH_ERROR',
        error
      }, window.location.origin);
      window.close();
    } else {
      // Check query params if not in hash (for response_type=code or errors)
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      const qError = queryParams.get('error');
      
      if (code) {
        window.opener.postMessage({
          type: 'OAUTH_CODE',
          code
        }, window.location.origin);
        window.close();
      } else if (qError) {
        window.opener.postMessage({
          type: 'OAUTH_ERROR',
          error: qError
        }, window.location.origin);
        window.close();
      }
    }
  }, []);

  return (
    <div className="h-screen w-full bg-bg flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      <h2 className="text-xl font-syne font-bold text-white">Authenticating...</h2>
      <p className="text-text3 text-sm">Please wait while we connect to your YouTube account.</p>
    </div>
  );
}
