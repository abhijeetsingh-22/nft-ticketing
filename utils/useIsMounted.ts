import { useEffect, useState } from "react";
// to fix the hyderation issue

export default function useIsMounted() {
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  return mounted;
}