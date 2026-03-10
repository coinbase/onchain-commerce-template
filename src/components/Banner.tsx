export function Banner() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (!isDemoMode) {
    return null;
  }

  return (
    <div className="ock-bg-default-reverse ock-text-inverse fixed top-0 left-0 flex h-10 xs:h-11 w-full flex-wrap items-center justify-center sm:h-13">
      <div className="flex h-full flex-wrap items-center justify-center text-center text-xs sm:text-sm">
        This is a demo site. These products are not for sale.
      </div>
    </div>
  );
}
