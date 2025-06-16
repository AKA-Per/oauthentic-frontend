// import {useNavigate} from 'react-router';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
export default function OAuth() {
    // const navigator = useNavigate();
    const location = useLocation();
  const query = new URLSearchParams(location.search);

  const sid = query.get('sid');
  const callback = query.get('callback');
  const scope = query.get('scope');

  useEffect(() => {
    console.log("Loaded the OAuth");
    console.log("SID:", sid);
    console.log("Callback:", callback);
    console.log("Scope:", scope);
    // Integrate an API to get the session validity and redirect to the login page with the params of session id
    
  }, [sid, callback, scope]);
  return (
    <>
      <p>Callback: {callback}</p>
      <p>SID: {sid}</p>
      <p>Scope: {scope}</p>
    </>
  );
}