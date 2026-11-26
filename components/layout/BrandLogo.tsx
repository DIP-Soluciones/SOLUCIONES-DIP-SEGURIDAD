import Image from 'next/image';

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center shrink-0 h-10 w-36 overflow-hidden ${className}`}>
      <Image
        src="/images/dip-logo.webp"
        alt="Soluciones DiP"
        fill
        priority
        className="object-contain object-left"
      />
    </div>
  );
}

export default BrandLogo;