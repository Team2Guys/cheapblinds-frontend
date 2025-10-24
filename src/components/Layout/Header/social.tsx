import { socialLinks } from 'data/Header'
import Link from 'next/link'
import React from 'react'

const SocialLink = ({className}:{className?:string}) => {
  return (
      <div className={`flex gap-2 items-center xl:mr-2 ${className}`}>
          {socialLinks.map(({ href, Icon,id }) => (
              <Link key={id} href={href} target="_blank" className="border rounded-full border-black md:border-white p-0.5 hover:bg-white hover:text-black transition">
                <Icon className="w-5 h-5" />
              </Link>
            ))}
      </div>
  )
}

export default SocialLink