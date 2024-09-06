import {SVGProps, memo} from "react";

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="rgb(49,125,148)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12.611 8.923 17.5 20 6.5"
        />
    </svg>
);
const MemoCheckIcon = memo(CheckIcon);
export default MemoCheckIcon;
