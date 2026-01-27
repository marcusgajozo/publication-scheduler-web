import * as LucideIcons from 'lucide-react'
import type React from 'react'

export type LucideIconName = keyof typeof LucideIcons

interface IconManagerProps {
  name: LucideIconName
  className?: string
  onClick?: (event: React.MouseEvent) => void
}

export const IconManager = ({
  name,
  className = '',
  onClick,
}: IconManagerProps) => {
  if (!name || !LucideIcons[name]) {
    return null
  }

  const IconComponent = LucideIcons[name] as React.FC<
    React.SVGProps<SVGSVGElement>
  >

  return <IconComponent onClick={onClick} className={`icon ${className}`} />
}
