  /*
  document.cookie - name=value
  name에 맞는 string을 찾는다.
  있으면 string index를 저장한다.
  index 5(name=) 이후부터 마지막까지의 스트링을 리턴한다.
  */
 
export const getCookie = (name, cookies) => {
    const searchName = name + "=";
    const searchNameLength = searchName.length;
    const nameIndexStart = cookies.indexOf(searchName);
    const Cookieval = cookies.substring(nameIndexStart + searchNameLength);
  
    return Cookieval;
  };