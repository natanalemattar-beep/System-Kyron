
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkDevice()

    // Listen for resize events
    window.addEventListener("resize", checkDevice)

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkDevice)
  }, []) // Empty dependency array ensures this runs once on mount

  return isMobile
}
