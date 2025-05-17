

export  function fetchGet(url) {
  
    return fetch(url, { credentials: "include" });
    
  
}

export function fetchPost(url, body) {
 
    return fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
}


export function fetchPatch(url, body) {
  
    return fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
}

export function fetchDelete(url, body) {
  
    return fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
}

