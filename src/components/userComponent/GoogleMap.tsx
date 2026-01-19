import React from "react";

export const GoogleMap = () => {
  return (
    <iframe
      className="w-full h-[200px] md:h-[400px]"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4289.72917030274!2d55.120278775925065!3d24.98758034015811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f136b6d69190b%3A0x1026582358119466!2sAgsons%20Middle%20East%20Trading%20LLC!5e1!3m2!1sen!2s!4v1768478240583!5m2!1sen!2s"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};
