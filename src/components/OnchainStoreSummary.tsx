import { GITHUB_LINK, ONCHAINKIT_LINK } from 'src/links';
import { ExternalLinkSvg } from 'src/svg/ExternalLinkSvg';

export default function OnchainStoreSummary() {
  return (
    <div className="flex flex-col justify-center border-gray-200 border-b p-4 py-8 pb-22 md:w-1/3 md:border-r md:border-b-0 md:py-4 lg:border-r lg:p-6 lg:pb-22">
      <div className="space-y-4 text-left">
        <h2
          className="font-bold text-3xl leading-tight"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontStretch: 'condensed',
          }}
        >
          The future of commerce is less fee. More creativity.
        </h2>
        <p className="text-sm leading-relaxed">
          People and businesses lose tens of billions of dollars in transaction
          fees and countless hours in delays to the current system that they
          wouldn't with onchain payments.
        </p>
        <p className="text-sm leading-relaxed">
          We're updating the system so it's cheaper and faster.
        </p>
        <div className="flex flex-col pt-6">
          <p className="pt-2 pb-2 font-bold text-sm leading-relaxed">
            BUILD YOUR ONCHAIN STORE
          </p>
          <a
            href={GITHUB_LINK}
            className="flex cursor-pointer items-center"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-sm leading-relaxed">FORK THIS TEMPLATE</p>
            <span className="pl-1">
              <ExternalLinkSvg />
            </span>
          </a>
          <a
            href={ONCHAINKIT_LINK}
            className="flex cursor-pointer items-center pt-1"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-sm leading-relaxed">VIEW DOCS</p>
            <span className="pl-1">
              <ExternalLinkSvg />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
