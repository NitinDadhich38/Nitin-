import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Arch-topped photograph: the one recurring shape of the membership pages,
 * borrowed from the doorways and windows of old clubs. Photography is
 * illustrative only (see imageCredit in lib/images.ts).
 */
export function ArchPhoto({
  src,
  alt,
  className,
  sizes = "(max-width:1024px) 90vw, 420px",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-[999px] rounded-b-[14px] bg-pran-sand",
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
