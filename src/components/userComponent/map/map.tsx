import React from "react";
function GoogleMap() {
  return (
    <iframe
      className="w-full h-[200px] md:h-[400px]"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1071.2942725066687!2d55.23613650736392!3d25.11772287777354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f698d0b075de1%3A0x223e3563a8be56be!2sBlinds%20And%20Curtains%20Dubai!5e1!3m2!1sen!2s!4v1761636776331!5m2!1sen!2s"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export default GoogleMap;
