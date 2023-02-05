import cn from "classnames";

interface Props {
  className?: string;
  onClick?: () => void;
  Component: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = ({ className, onClick, Component }: Props) => {
  return <Component className={cn("icon", className)} onClick={onClick} />;
};
