import { Link } from "react-router";

interface RouterLinkProps extends React.ComponentProps<"a"> {
  href: string;
  children: React.ReactNode;
}

export function RouterLink({ href, children }: RouterLinkProps) {
  return <Link to={href}>{children}</Link>;
}
